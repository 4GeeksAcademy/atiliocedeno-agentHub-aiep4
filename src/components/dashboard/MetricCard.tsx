import type { Metric } from '../../data/mockData';

interface MetricCardProps {
  metric: Metric;
}

const colorMap = {
  tertiary: 'text-tertiary',
  secondary: 'text-secondary',
  primary: 'text-primary',
  red: 'text-red-400',
  yellow: 'text-yellow-400',
};

const bgMap = {
  tertiary: 'bg-tertiary/10',
  secondary: 'bg-secondary/10',
  primary: 'bg-primary/10',
  red: 'bg-red-500/10',
  yellow: 'bg-yellow-500/10',
};

const trendIcons = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${bgMap[metric.color as keyof typeof bgMap] || 'bg-primary/10'} flex items-center justify-center text-xl`}>
          {metric.icon}
        </div>
        <span className={`text-sm ${trendIcons[metric.trend] === '↑' ? 'text-tertiary' : trendIcons[metric.trend] === '↓' ? 'text-red-400' : 'text-gray-400'}`}>
          {trendIcons[metric.trend]}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-400">{metric.label}</p>
        <p className={`text-2xl font-bold ${colorMap[metric.color as keyof typeof colorMap] || 'text-white'}`}>
          {metric.value}
        </p>
      </div>
    </div>
  );
}