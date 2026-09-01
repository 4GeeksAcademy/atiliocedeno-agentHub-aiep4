import { h } from "../../lib/dom.js";
import { openModal, closeModal, hireAgent } from "../../lib/appState.js";
import { Badge } from "../ui/Badge.js";

const skillColors = ["primary", "secondary", "tertiary", "yellow", "red"];

export function ExploreCard(agent) {
  function showDetails() {
    const body = h("div", { class: "flex flex-col gap-4" },
      h("div", { class: "flex items-center gap-3" },
        h("div", { class: "w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-3xl" }, agent.icon),
        h("div", {},
          h("span", { class: "inline-block px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300" }, agent.category),
          h("p", { class: "text-gray-500 dark:text-gray-400 text-sm mt-1" }, agent.description)
        )
      ),
      h("div", {},
        h("h4", { class: "text-sm font-semibold text-gray-900 dark:text-white mb-2" }, "Skills"),
        h("div", { class: "flex flex-wrap gap-2" },
          ...agent.skills.map((skill, i) => Badge(skill, skillColors[i % skillColors.length]))
        )
      ),
      h("div", { class: "flex gap-3 justify-end pt-2 border-t border-gray-200 dark:border-[#334155]/30" },
        (() => {
          const c = h("button", { class: "px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#475569] transition-colors text-sm" }, "Cerrar");
          c.addEventListener("click", closeModal);
          return c;
        })(),
        (() => {
          const hBtn = h("button", { class: "px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity text-sm font-medium" }, "Contratar agente");
          hBtn.addEventListener("click", () => {
            hireAgent(agent);
            openModal("Contratado!", h("p", { class: "text-gray-500 dark:text-gray-400" }, agent.name + " ha sido agregado a tus agentes."));
          });
          return hBtn;
        })()
      )
    );
    openModal(agent.name, body);
  }

  function quickHire() {
    hireAgent(agent);
    const toast = h("div", { class: "fixed bottom-4 left-1/2 -translate-x-1/2 bg-tertiary text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium animate-bounce" }, agent.name + " contratado!");
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  return h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300 group" },
    h("div", { class: "flex items-start justify-between" },
      h("div", { class: "flex items-center gap-3" },
        h("div", { class: "w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-xl flex items-center justify-center text-2xl" }, agent.icon),
        h("div", {},
          h("h3", { class: "text-gray-900 dark:text-white font-semibold" }, agent.name),
          h("span", { class: "inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary dark:bg-secondary/20" }, agent.category)
        )
      )
    ),
    h("p", { class: "text-sm text-gray-500 dark:text-gray-400 line-clamp-2" }, agent.description),
    h("div", { class: "flex flex-wrap gap-2" },
      ...agent.skills.slice(0, 3).map((skill, i) => Badge(skill, skillColors[i % skillColors.length]))
    ),
    h("div", { class: "flex gap-2 mt-auto" },
      (() => {
        const d = h("button", { class: "flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 dark:bg-secondary/20 dark:text-secondary-300 dark:hover:bg-secondary/30 transition-colors" }, "Ver detalle");
        d.addEventListener("click", showDetails);
        return d;
      })(),
      (() => {
        const hb = h("button", { class: "flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:opacity-90 transition-opacity" }, "Contratar");
        hb.addEventListener("click", quickHire);
        return hb;
      })()
    )
  );
}