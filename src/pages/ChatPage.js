import { h } from "../lib/dom.js";

export function ChatPage() {
  return h("div", { class: "flex flex-col gap-6" },
    h("div", {},
      h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Chat"),
      h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Conversa con tus agentes de IA")
    ),
    h("div", { class: "bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-[#334155]/30 flex items-center justify-center py-16" },
      h("div", { class: "text-center" },
        h("span", { class: "text-5xl" }, "💬"),
        h("p", { class: "text-gray-500 dark:text-gray-400 mt-4" }, "Próximamente — Chat con agentes de IA")
      )
    )
  );
}
