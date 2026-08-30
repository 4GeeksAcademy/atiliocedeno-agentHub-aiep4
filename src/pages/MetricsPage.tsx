import { MetricsGrid } from '../components/dashboard/ActivityChart';
import ActivityChart from '../components/dashboard/ActivityChart';

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-montserrat">Dashboard de Métricas</h1>
        <p className="text-gray-400 mt-1">Resumen de rendimiento y actividad de tus agentes</p>
      </div>

      <MetricsGrid />

      <ActivityChart />
    </div>
  );
}