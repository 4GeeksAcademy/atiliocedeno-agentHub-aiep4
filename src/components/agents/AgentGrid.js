import { h } from "../../lib/dom.js";
import { store } from "../../lib/appState.js";
import { AgentCard } from "./AgentCard.js";

export function AgentGrid() {
  const container = h("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" });
  function render() {
    container.innerHTML = "";
    store.get("agents").forEach((a) => container.appendChild(AgentCard(a)));
  }
  render();
  store.subscribe("agents", render);
  return container;
}
