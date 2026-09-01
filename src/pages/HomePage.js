import { h } from "../lib/dom.js";
import { SearchBar } from "../components/ui/SearchBar.js";
import { AgentGrid } from "../components/agents/AgentGrid.js";
import { store } from "../lib/appState.js";

export function HomePage() {
  const agents = store.get("agents");
  return h("div", { class: "flex flex-col gap-8" },
    h("section", { class: "flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12" },
      h("div", { class: "flex-1" },
        h("h1", { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-montserrat leading-tight" },
          "Alquila ", h("span", { class: "text-primary" }, "Agentes de IA"), h("br"), "para tu Negocio"
        ),
        h("p", { class: "mt-4 text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed" },
          "AgentHub es una plataforma donde puedes alquilar y tener asesorías asociadas a agentes de IA."
        )
      ),
      h("div", { class: "w-full md:w-auto" }, SearchBar())
    ),
    h("section", {},
      h("div", { class: "flex items-center justify-between mb-6" },
        h("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, "Tus Agentes"),
        h("span", { class: "text-sm text-gray-500 dark:text-gray-400" }, agents.length + " agentes contratados")
      ),
      AgentGrid()
    )
  );
}
