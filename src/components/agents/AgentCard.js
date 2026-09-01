import { h } from "../../lib/dom.js";
import { openModal, closeModal, removeAgent } from "../../lib/appState.js";
import { Badge } from "../ui/Badge.js";
import { ActionsDropdown } from "../ui/ActionsDropdown.js";

const statusColors = { active: "bg-tertiary", inactive: "bg-gray-400" };
const skillColors = ["primary", "secondary", "tertiary", "yellow"];

export function AgentCard(agent) {
  function showDetail() {
    const body = h("div", { class: "flex flex-col gap-4" },
      h("div", { class: "flex items-center gap-3" },
        h("div", { class: "w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-3xl" }, agent.icon),
        h("div", {},
          h("div", { class: "flex items-center gap-2" },
            h("span", { class: "w-2.5 h-2.5 rounded-full " + statusColors[agent.status] }),
            h("span", { class: "text-sm text-gray-500 dark:text-gray-400 capitalize" }, agent.status)
          ),
          h("p", { class: "text-gray-500 dark:text-gray-400 text-sm mt-1" }, agent.description)
        )
      ),
      h("div", {},
        h("h4", { class: "text-sm font-semibold text-gray-900 dark:text-white mb-2" }, "Skills"),
        h("div", { class: "flex flex-wrap gap-2" },
          ...agent.skills.map((skill, i) => Badge(skill, skillColors[i % skillColors.length]))
        )
      )
    );
    openModal(agent.name, body);
  }

  function confirmDelete() {
    const body = h("div", {},
      h("p", { class: "text-gray-500 dark:text-gray-400 mb-6" },
        "¿Estás seguro de que deseas eliminar a ",
        h("strong", { class: "text-gray-900 dark:text-white" }, agent.name),
        "? Esta acción no se puede deshacer."
      ),
      h("div", { class: "flex gap-3 justify-end" },
        (() => {
          const c = h("button", { class: "px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#475569] transition-colors" }, "Cancelar");
          c.addEventListener("click", closeModal);
          return c;
        })(),
        (() => {
          const d = h("button", { class: "px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors" }, "Eliminar");
          d.addEventListener("click", () => { removeAgent(agent.id); closeModal(); });
          return d;
        })()
      )
    );
    openModal("Eliminar agente", body);
  }

  return h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-4 hover:border-primary/30 transition-all duration-300 group" },
    h("div", { class: "flex items-start justify-between" },
      h("div", { class: "flex items-center gap-3" },
        h("div", { class: "w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-2xl" }, agent.icon),
        h("div", {},
          h("h3", { class: "text-gray-900 dark:text-white font-semibold" }, agent.name),
          h("div", { class: "flex items-center gap-1.5 mt-1" },
            h("span", { class: "w-2 h-2 rounded-full " + statusColors[agent.status] }),
            h("span", { class: "text-xs text-gray-500 dark:text-gray-400 capitalize" }, agent.status)
          )
        )
      ),
      ActionsDropdown([{ label: "Ver detalle", onClick: showDetail }, { label: "Eliminar", onClick: confirmDelete, variant: "danger" }])
    ),
    h("p", { class: "text-sm text-gray-500 dark:text-gray-400 line-clamp-2" }, agent.description),
    h("div", { class: "flex flex-wrap gap-2" },
      ...agent.skills.map((skill, i) => Badge(skill, skillColors[i % skillColors.length]))
    )
  );
}
