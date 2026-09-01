/**
 * Global app store for AgentHub
 */
import { Store } from "./store.js";
import { DEFAULT_AGENTS } from "../data/mockData.js";

const initialState = {
  darkMode: true,
  searchQuery: "",
  agents: DEFAULT_AGENTS,
  currentPage: "/",
  modalOpen: false,
  modalTitle: "",
  modalBody: null,
};

export const store = new Store(initialState, { persistKey: "agenthub-state" });

export function toggleDarkMode() {
  const newMode = !store.get("darkMode");
  store.set("darkMode", newMode);
  document.documentElement.classList.toggle("dark", newMode);
}

export function removeAgent(id) {
  const agents = store.get("agents").filter((a) => a.id !== id);
  store.set("agents", agents);
}

export function setSearchQuery(q) {
  store.set("searchQuery", q);
}

export function setCurrentPage(path) {
  store.set("currentPage", path);
}

export function openModal(title, body) {
  store.update(() => ({ modalOpen: true, modalTitle: title, modalBody: body }));
}

export function closeModal() {
  store.update(() => ({ modalOpen: false, modalBody: null }));
}

export function hireAgent(agent) {
  const currentAgents = store.get('agents');
  const exists = currentAgents.find((a) => a.id === agent.id);
  if (exists) return;
  const newAgent = { ...agent, status: 'active' };
  store.set('agents', [...currentAgents, newAgent]);
}
