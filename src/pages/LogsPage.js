import { h } from "../lib/dom.js";
import { openModal, closeModal } from "../lib/appState.js";
import { ERROR_LOGS } from "../data/mockData.js";

const severityColors = {
  Alta: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-500" },
  Media: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-500" },
  Baja: { bg: "bg-blue-500/20", text: "text-blue-400", dot: "bg-blue-500" },
};

function showLogDetail(log) {
  const severity = severityColors[log.severity] || severityColors.Media;
  const body = h("div", { class: "flex flex-col gap-4" },
    h("div", { class: "flex items-center gap-3" },
      h("div", { class: `w-14 h-14 ${severity.bg} rounded-2xl flex items-center justify-center text-2xl` },
        log.severity === "Alta" ? "🔴" : log.severity === "Media" ? "🟡" : "🔵"
      ),
      h("div", { class: "flex-1" },
        h("h4", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, log.type),
        h("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Agente: " + log.agent)
      )
    ),
    h("div", { class: "p-4 bg-gray-50 dark:bg-[#0F172A]/50 rounded-xl" },
      h("p", { class: "text-sm text-gray-700 dark:text-gray-300 font-mono" }, log.message)
    ),
    h("div", { class: "grid grid-cols-2 gap-4" },
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Severidad"),
        h("div", { class: "flex items-center gap-2 mt-1" },
          h("span", { class: `w-2.5 h-2.5 rounded-full ${severity.dot}` }),
          h("span", { class: `text-sm font-medium ${severity.text}` }, log.severity)
        )
      ),
      h("div", {},
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Estado"),
        h("div", { class: "flex items-center gap-2 mt-1" },
          h("span", { class: `w-2.5 h-2.5 rounded-full ${log.resolved ? "bg-tertiary" : "bg-red-500"}` }),
          h("span", { class: `text-sm font-medium ${log.resolved ? "text-tertiary" : "text-red-400"}` }, log.resolved ? "Resuelto" : "Pendiente")
        )
      ),
      h("div", { class: "col-span-2" },
        h("p", { class: "text-xs text-gray-400 uppercase tracking-wider" }, "Fecha y hora"),
        h("p", { class: "text-sm font-medium text-gray-900 dark:text-white mt-1" }, log.timestamp)
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
  openModal(log.type, body);
}

export function LogsPage() {
  return h("div", { class: "flex flex-col gap-6" },
    h("div", {},
      h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Registro de Errores"),
      h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Monitor de errores y eventos del sistema")
    ),
    h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg border border-gray-200 dark:border-[#334155]/30 overflow-hidden" },
      h("div", { class: "overflow-x-auto" },
        h("table", { class: "w-full text-sm" },
          h("thead", { class: "bg-gray-50 dark:bg-[#0F172A]/50 border-b border-gray-200 dark:border-[#334155]/30" },
            h("tr", {},
              ...["Agente", "Tipo", "Mensaje", "Severidad", "Estado", "Fecha", "Acciones"].map(heading =>
                h("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" }, heading)
              )
            )
          ),
          h("tbody", { class: "divide-y divide-gray-200 dark:divide-[#334155]/30" },
            ...ERROR_LOGS.map(log => {
              const severity = severityColors[log.severity] || severityColors.Media;
              return h("tr", { class: "hover:bg-gray-50 dark:hover:bg-[#1E293B]/80 transition-colors" },
                h("td", { class: "px-4 py-3 text-gray-900 dark:text-white font-medium" }, log.agent),
                h("td", { class: "px-4 py-3" },
                  h("span", { class: `inline-flex px-2 py-0.5 rounded text-xs font-medium ${severity.bg} ${severity.text}` }, log.type)
                ),
                h("td", { class: "px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate" }, log.message),
                h("td", { class: "px-4 py-3" },
                  h("div", { class: "flex items-center gap-1.5" },
                    h("span", { class: `w-2 h-2 rounded-full ${severity.dot}` }),
                    h("span", { class: `text-xs font-medium ${severity.text}` }, log.severity)
                  )
                ),
                h("td", { class: "px-4 py-3" },
                  h("span", {
                    class: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                      log.resolved ? "bg-tertiary/20 text-tertiary" : "bg-red-500/20 text-red-400"
                    }`
                  },
                    h("span", { class: `w-1.5 h-1.5 rounded-full ${log.resolved ? "bg-tertiary" : "bg-red-500"}` }),
                    log.resolved ? "Resuelto" : "Pendiente"
                  )
                ),
                h("td", { class: "px-4 py-3 text-xs text-gray-500 dark:text-gray-400" }, log.timestamp),
                h("td", { class: "px-4 py-3" },
                  (() => {
                    const btn = h("button", {
                      class: "px-2.5 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                    }, "Ver detalle");
                    btn.addEventListener("click", () => showLogDetail(log));
                    return btn;
                  })()
                )
              );
            })
          )
        )
      )
    )
  );
}