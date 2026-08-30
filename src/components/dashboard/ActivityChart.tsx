import { METRICS_DATA } from '../../data/mockData';
import MetricCard from './MetricCard';

export default function ActivityChart() {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900 dark:text-white font-semibold">Actividad Semanal</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">Últimos 7 días</span>
      </div>
      {/* Placeholder for chart area */}
      <div className="h-48 bg-gray-100 dark:bg-[#0F172A]/50 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-[#334155]/50">
        <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-sm">Gráfico de actividad semanal</span>
        </div>
      </div>
    </div>
  );
}

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS_DATA.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}