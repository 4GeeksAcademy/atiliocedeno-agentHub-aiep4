import { h } from "../lib/dom.js";
import { openModal, closeModal } from "../lib/appState.js";
import { SKILLS_DATA } from "../data/mockData.js";
import { Badge } from "../components/ui/Badge.js";

const proficiencyColors = { Avanzado: "primary", Intermedio: "secondary", Experto: "tertiary" };
const proficiencyIcons = { Avanzado: "⭐", Intermedio: "🌟", Experto: "👑" };

function showSkillDetail(skill) {
  const body = h("div", { class: "flex flex-col gap-4" },
    h("div", { class: "flex items-center gap-4" },
      h("div", { class: "w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-3xl" }, skill.icon),
      h("div", { class: "flex-1" },
        h("h4", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, skill.name),
        h("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, skill.category)
      )
    ),
    h("p", { class: "text-gray-500 dark:text-gray-400" }, skill.description),
    h("div", { class: "grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-[#0F172A]/50 rounded-xl" },
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Nivel"),
        h("div", { class: "flex items-center gap-2 mt-1" },
          h("span", { class: "text-lg" }, proficiencyIcons[skill.proficiency] || "📊"),
          h("span", { class: "text-sm font-medium text-gray-900 dark:text-white" }, skill.proficiency)
        )
      ),
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Agentes con esta skill"),
        h("p", { class: "text-2xl font-bold text-gray-900 dark:text-white mt-1" }, skill.agentsCount)
      )
    ),
    h("div", { class: "flex gap-3 justify-end pt-2 border-t border-gray-200 dark:border-[#334155]/30" },
      (() => {
        const c = h("button", { class: "px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#475569] transition-colors text-sm" }, "Cerrar");
        c.addEventListener("click", closeModal);
        return c;
      })()
    )
  );
  openModal(skill.name, body);
}

export function SkillsPage() {
  return h("div", { class: "flex flex-col gap-6" },
    h("div", {},
      h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Habilidades"),
      h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Catálogo de habilidades disponibles para los agentes de IA")
    ),
    h("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
      ...SKILLS_DATA.map(skill => {
        const categories = [skill.category];
        const card = h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-4 hover:border-secondary/30 transition-all duration-300" },
          h("div", { class: "flex items-center gap-3" },
            h("div", { class: "w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-xl flex items-center justify-center text-2xl" }, skill.icon),
            h("div", { class: "flex-1" },
              h("h3", { class: "text-gray-900 dark:text-white font-semibold" }, skill.name),
              h("div", { class: "flex flex-wrap gap-1.5 mt-1" },
                ...categories.map(cat => Badge(cat, "secondary"))
              )
            )
          ),
          h("p", { class: "text-sm text-gray-500 dark:text-gray-400 line-clamp-2" }, skill.description),
          h("div", { class: "flex items-center justify-between mt-auto" },
            h("div", { class: "flex items-center gap-1.5" },
              h("span", { class: "text-sm" }, proficiencyIcons[skill.proficiency] || "📊"),
              h("span", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, skill.proficiency)
            ),
            h("span", { class: "text-xs text-gray-500 dark:text-gray-400" }, skill.agentsCount + " agentes")
          ),
          (() => {
            const btn = h("button", { class: "w-full px-3 py-2 rounded-lg text-sm font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 dark:bg-secondary/20 dark:text-secondary-300 dark:hover:bg-secondary/30 transition-colors" }, "Ver detalles");
            btn.addEventListener("click", () => showSkillDetail(skill));
            return btn;
          })()
        );
        return card;
      })
    )
  );
}