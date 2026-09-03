import { h } from "../lib/dom.js";
import { openModal, closeModal } from "../lib/appState.js";
import { USERS_DATA } from "../data/mockData.js";

const statusColors = { active: "bg-tertiary", inactive: "bg-gray-400" };
const planColors = { Premium: "text-yellow-400", Pro: "text-secondary", Básico: "text-gray-400", Enterprise: "text-primary" };

function showUserDetail(user) {
  const body = h("div", { class: "flex flex-col gap-4" },
    h("div", { class: "flex items-center gap-4" },
      h("div", { class: "w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-4xl" }, user.avatar),
      h("div", { class: "flex-1" },
        h("h4", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, user.name),
        h("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, user.email),
        h("div", { class: "flex items-center gap-2 mt-1" },
          h("span", { class: `w-2.5 h-2.5 rounded-full ${statusColors[user.status]}` }),
          h("span", { class: "text-sm capitalize text-gray-500 dark:text-gray-400" }, user.status === "active" ? "Activo" : "Inactivo")
        )
      )
    ),
    h("div", { class: "grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-[#0F172A]/50 rounded-xl" },
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Rol"),
        h("p", { class: "text-sm font-medium text-gray-900 dark:text-white mt-1" }, user.role)
      ),
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Plan"),
        h("p", { class: `text-sm font-medium mt-1 ${planColors[user.plan] || "text-gray-900 dark:text-white"}` }, user.plan)
      ),
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Agentes"),
        h("p", { class: "text-sm font-medium text-gray-900 dark:text-white mt-1" }, user.agents + " agentes")
      ),
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Miembro desde"),
        h("p", { class: "text-sm font-medium text-gray-900 dark:text-white mt-1" }, user.since)
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
  openModal(user.name, body);
}

export function UsuariosPage() {
  return h("div", { class: "flex flex-col gap-6" },
    h("div", {},
      h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Gestión de Usuarios"),
      h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Administra los usuarios registrados en la plataforma")
    ),
    h("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
      ...USERS_DATA.map(user => {
        const card = h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex flex-col gap-4 hover:border-primary/30 transition-all duration-300" },
          h("div", { class: "flex items-center gap-3" },
            h("div", { class: "w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-2xl" }, user.avatar),
            h("div", { class: "flex-1" },
              h("h3", { class: "text-gray-900 dark:text-white font-semibold" }, user.name),
              h("div", { class: "flex items-center gap-1.5 mt-1" },
                h("span", { class: `w-2 h-2 rounded-full ${statusColors[user.status]}` }),
                h("span", { class: "text-xs text-gray-500 dark:text-gray-400 capitalize" }, user.status === "active" ? "Activo" : "Inactivo")
              )
            )
          ),
          h("div", { class: "text-sm text-gray-500 dark:text-gray-400" }, user.email),
          h("div", { class: "flex items-center justify-between text-sm" },
            h("span", { class: "text-gray-500 dark:text-gray-400" }, h("span", { class: "font-medium text-gray-900 dark:text-white" }, user.role)),
            h("span", { class: `${planColors[user.plan] || "text-gray-500 dark:text-gray-400"} font-medium` }, user.plan)
          ),
          (() => {
            const btn = h("button", { class: "w-full px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-300 dark:hover:bg-primary/30 transition-colors" }, "Ver detalles");
            btn.addEventListener("click", () => showUserDetail(user));
            return btn;
          })()
        );
        return card;
      })
    )
  );
}