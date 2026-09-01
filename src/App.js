import { h } from "./lib/dom.js";
import { router } from "./lib/router.js";
import { store, setCurrentPage } from "./lib/appState.js";
import { Navbar } from "./components/layout/Navbar.js";
import { Sidebar } from "./components/layout/Sidebar.js";
import { HomePage } from "./pages/HomePage.js";
import { MetricsPage } from "./pages/MetricsPage.js";
import { AgentsPage } from "./pages/AgentsPage.js";
import { ExplorePage } from "./pages/ExplorePage.js";
import { ChatPage } from "./pages/ChatPage.js";

export function renderApp() {
  const root = document.getElementById("root");
  if (!root) return;

  const darkMode = store.get("darkMode");
  document.documentElement.classList.toggle("dark", darkMode);

  router.addRoute("/", () => { setCurrentPage("/"); return HomePage(); });
  router.addRoute("/explore", () => { setCurrentPage("/explore"); return ExplorePage(); });
  router.addRoute("/agentes", () => { setCurrentPage("/agentes"); return AgentsPage(); });
  router.addRoute("/chat", () => { setCurrentPage("/chat"); return ChatPage(); });
  router.addRoute("/metrics", () => { setCurrentPage("/metrics"); return MetricsPage(); });

  const main = h("main", { class: "flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" });
  const layout = h("div", { class: "min-h-screen bg-gray-50 text-gray-900 dark:bg-neutral dark:text-white" },
    Navbar(),
    h("div", { class: "flex" }, Sidebar(), main)
  );

  router.setRenderFn((el) => {
    main.innerHTML = "";
    main.appendChild(el);
  });

  root.appendChild(layout);
  router.init();
}
