import { h, ICONS, iconSvg } from "../../lib/dom.js";
import { METRICS_DATA } from "../../data/mockData.js";
import { MetricCard } from "./MetricCard.js";

export function ActivityChart() {
  const chartIcon = document.createElement("div");
  chartIcon.innerHTML = iconSvg(ICONS.chart, "w-8 h-8");
  return h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-4" },
    h("div", { class: "flex items-center justify-between" },
      h("h3", { class: "text-gray-900 dark:text-white font-semibold" }, "Actividad Semanal"),
      h("span", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Últimos 7 días")
    ),
    h("div", { class: "h-48 bg-gray-100 dark:bg-[#0F172A]/50 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-[#334155]/50" },
      h("div", { class: "flex flex-col items-center gap-2 text-gray-500 dark:text-gray-500" },
        chartIcon.firstElementChild,
        h("span", { class: "text-sm" }, "Gráfico de actividad semanal")
      )
    )
  );
}

export function MetricsGrid() {
  return h("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" },
    ...METRICS_DATA.map((m) => MetricCard(m))
  );
}
