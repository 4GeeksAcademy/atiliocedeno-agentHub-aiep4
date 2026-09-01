import { h } from "../lib/dom.js";
import { AgentGrid } from "../components/agents/AgentGrid.js";

export function AgentsPage() {
  return h("div", { class: "flex flex-col gap-6" },
    h("div", {},
      h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Agentes"),
      h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Gestiona tus agentes de IA contratados")
    ),
    AgentGrid()
  );
}
