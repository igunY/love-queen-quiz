import { queens, type Queen } from '@/data/queens';

export interface Answer {
  questionId: string;
  axis: 1 | 2 | 3 | 4 | 5;
  score: number;
  stage: number;
}

export interface AxisScores {
  axis1: number;
  axis2: number;
  axis3: number;
  axis4: number;
  axis5: number;
}

export interface DiagnosisResult {
  queen: Queen;
  axisScores: AxisScores;
  normalized: AxisScores;
  confidence: number; // 0-100
}

export function calculateAxisScores(answers: Answer[]): AxisScores {
  const scores: AxisScores = { axis1: 0, axis2: 0, axis3: 0, axis4: 0, axis5: 0 };
  for (const answer of answers) {
    const key = `axis${answer.axis}` as keyof AxisScores;
    scores[key] += answer.score;
  }
  return scores;
}

function euclideanDistance(u: number[], p: number[]): number {
  return Math.sqrt(u.reduce((sum, ui, i) => sum + Math.pow(ui - p[i], 2), 0));
}

export function diagnose(answers: Answer[]): DiagnosisResult {
  const rawScores = calculateAxisScores(answers);

  // Count answers per axis for normalization
  const counts = { axis1: 0, axis2: 0, axis3: 0, axis4: 0, axis5: 0 };
  for (const a of answers) {
    counts[`axis${a.axis}` as keyof AxisScores]++;
  }

  // Normalize to [-2, +2] by averaging
  const normalized: AxisScores = { axis1: 0, axis2: 0, axis3: 0, axis4: 0, axis5: 0 };
  for (let i = 1; i <= 5; i++) {
    const k = `axis${i}` as keyof AxisScores;
    normalized[k] = counts[k] > 0 ? rawScores[k] / counts[k] : 0;
  }

  const userVec = [normalized.axis1, normalized.axis2, normalized.axis3, normalized.axis4, normalized.axis5];

  const distances = queens.map(q => ({
    queen: q,
    distance: euclideanDistance(userVec, q.axes as number[]),
  }));
  distances.sort((a, b) => a.distance - b.distance);

  // Confidence = how much the closest queen stands out among ALL candidates,
  // not just the runner-up. A softmax over distances (temperature tuned so a
  // clear standout lands ~90-100% and a crowded field still reads ~30-60%,
  // rather than the old "margin over 2nd place" metric which mostly landed
  // near 0% because the 12 queens are packed closely in the 5-axis space.
  const TEMPERATURE = 0.4;
  const minDistance = distances[0].distance;
  const weights = distances.map(({ distance }) => Math.exp(-(distance - minDistance) / TEMPERATURE));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const confidence = Math.round((weights[0] / totalWeight) * 100);

  return { queen: distances[0].queen, axisScores: rawScores, normalized, confidence };
}
