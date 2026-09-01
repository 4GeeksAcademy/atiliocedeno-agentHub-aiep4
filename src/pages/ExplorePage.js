import { h } from "../lib/dom.js";
import { EXPLORE_AGENTS } from "../data/mockData.js";
import { ExploreCard } from "../components/explore/ExploreCard.js";

const CATEGORIES = [...new Set(EXPLORE_AGENTS.map((a) => a.category))];

export function ExplorePage() {
  const container = h("div", { class: "flex flex-col gap-8" });

  const header = h("div", {},
    h("h1", { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat" }, "Explorar Agentes"),
    h("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, "Descubre y contrata nuevos agentes de IA para tu negocio")
  );
  container.appendChild(header);

  CATEGORIES.forEach((cat) => {
    const agents = EXPLORE_AGENTS.filter((a) => a.category === cat);
    const section = h("section", { class: "flex flex-col gap-4" },
      h("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, cat),
      h("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
        ...agents.map((a) => ExploreCard(a))
      )
    );
    container.appendChild(section);
  });

  return container;
}
