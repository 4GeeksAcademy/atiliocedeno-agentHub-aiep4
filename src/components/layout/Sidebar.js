import { h } from "../../lib/dom.js";
import { setCurrentPage } from "../../lib/appState.js";
import { router } from "../../lib/router.js";

const SIDEBAR_LINKS = [
  { label: "Inicio", path: "/", icon: "🏠" },
  { label: "Explore", path: "/explore", icon: "🔎" },
  { label: "Agentes", path: "/agentes", icon: "🤖" },
  { label: "Chat", path: "/chat", icon: "💬" },
  { label: "Metrics", path: "/metrics", icon: "📊" },
];

export function Sidebar() {
  function getCurrentPage() {
    return window.location.hash.slice(1) || "/";
  }
  const links = SIDEBAR_LINKS.map((link) => {
    const isActive = getCurrentPage() === link.path;
    const a = h("a", {
      class: "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors " + (isActive ? "bg-primary/10 text-primary dark:bg-primary/20" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#334455]/50"),
      href: "#" + link.path
    }, h("span", { class: "text-lg" }, link.icon), link.label);
    a.addEventListener("click", (e) => { e.preventDefault(); setCurrentPage(link.path); router.navigate(link.path); });
    return a;
  });
  return h("aside", { class: "hidden lg:flex flex-col w-64 bg-gray-100 dark:bg-[#1E293B] border-r border-gray-200 dark:border-[#334155]/50 h-[calc(100vh-4rem)] sticky top-16 p-4" },
    h("nav", { class: "flex flex-col gap-1" }, ...links)
  );
}
