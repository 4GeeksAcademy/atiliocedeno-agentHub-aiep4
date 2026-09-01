import { h } from "../lib/dom.js";
import { MetricsGrid, ActivityChart } from "../components/dashboard/ActivityChart.js";

export function MetricsPage() {
  return h("div", { class: "flex flex-col gap-8" },
    h("div", {},
      h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Dashboard de Métricas"),
      h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Resumen de rendimiento y actividad de tus agentes")
    ),
    MetricsGrid(),
    ActivityChart()
  );
}
