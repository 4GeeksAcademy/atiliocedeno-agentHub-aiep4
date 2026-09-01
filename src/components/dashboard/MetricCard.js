import { h } from "../../lib/dom.js";

const colorMap = { tertiary: "text-tertiary", secondary: "text-secondary", primary: "text-primary", red: "text-red-400", yellow: "text-yellow-400" };
const bgMap = { tertiary: "bg-tertiary/10", secondary: "bg-secondary/10", primary: "bg-primary/10", red: "bg-red-500/10", yellow: "bg-yellow-500/10" };
const trendIcons = { up: "↑", down: "↓", neutral: "→" };
const trendColors = { up: "text-tertiary", down: "text-red-500 dark:text-red-400", neutral: "text-gray-500 dark:text-gray-400" };

export function MetricCard(metric) {
  return h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-3" },
    h("div", { class: "flex items-center justify-between" },
      h("div", { class: "w-10 h-10 rounded-xl " + (bgMap[metric.color] || "bg-primary/10") + " flex items-center justify-center text-xl" }, metric.icon),
      h("span", { class: "text-sm " + (trendColors[metric.trend] || trendColors.neutral) }, trendIcons[metric.trend] || "→")
    ),
    h("div", {},
      h("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, metric.label),
      h("p", { class: "text-2xl font-bold " + (colorMap[metric.color] || "text-gray-900 dark:text-white") }, metric.value)
    )
  );
}
