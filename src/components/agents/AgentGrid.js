import { h } from "../../lib/dom.js";
import { store } from "../../lib/appState.js";
import { AgentCard } from "./AgentCard.js";

export function AgentGrid() {
  const container = h("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" });
  function render() {
    container.innerHTML = "";
    const query = store.get("searchQuery").toLowerCase().trim();
    const agents = store.get("agents");
    const filtered = query
      ? agents.filter((a) =>
          a.name.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.skills.some((s) => s.toLowerCase().includes(query))
        )
      : agents;
    filtered.forEach((a) => container.appendChild(AgentCard(a)));
  }
  render();
  store.subscribe("agents", render);
  store.subscribe("searchQuery", render);
  return container;
}
