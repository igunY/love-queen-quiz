'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { AxisScores } from '@/lib/diagnose';
import type { Queen } from '@/data/queens';

interface Props {
  axisScores: AxisScores;
  queen: Queen;
}

const AXIS_LABELS = ['情熱', '依存', '直感', '直球', '尽くされ'];

// Normalize score from [-4,+4] to [0,8] for chart display
function normalize(v: number): number {
  return v + 4;
}

export default function QueenRadarChart({ axisScores, queen }: Props) {
  const data = AXIS_LABELS.map((label, i) => {
    const axisKey = `axis${i + 1}` as keyof AxisScores;
    const queenScore = queen.axes[i] * 2; // scale queen's [-2,+2] to [-4,+4]
    return {
      label,
      あなた: normalize(axisScores[axisKey]),
      [queen.name]: normalize(queenScore),
      fullMark: 8,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid gridType="polygon" stroke="rgba(212,175,55,0.25)" />
        <PolarAngleAxis
          dataKey="label"
          tick={{ fontSize: 13, fontWeight: 600, fill: '#f4e2a1' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 8]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name={queen.name}
          dataKey={queen.name}
          stroke={queen.gemColor}
          fill={queen.gemColor}
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Radar
          name="あなた"
          dataKey="あなた"
          stroke="#d4af37"
          fill="#d4af37"
          fillOpacity={0.35}
          strokeWidth={2.5}
        />
        <Legend
          wrapperStyle={{ fontSize: '13px', paddingTop: '8px', color: '#f4e2a1' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
