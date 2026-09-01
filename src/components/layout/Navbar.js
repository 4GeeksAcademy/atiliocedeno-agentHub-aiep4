import { h, ICONS, iconSvg } from "../../lib/dom.js";
import { store, setCurrentPage } from "../../lib/appState.js";
import { router } from "../../lib/router.js";
import { DarkModeToggle } from "../ui/DarkModeToggle.js";

const NAV_LINKS = [
  { label: "Explore", path: "/explore" },
  { label: "Agentes", path: "/agentes" },
  { label: "Chat", path: "/chat" },
  { label: "Metrics", path: "/metrics" },
];

export function Navbar() {
  const currentPath = store.get("currentPage");

  function makeLink(link, isMobile) {
    const isActive = currentPath === link.path;
    const classes = isMobile
      ? "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors " + (isActive ? "text-primary" : "text-gray-500 dark:text-gray-400")
      : "px-4 py-2 rounded-lg text-sm font-medium transition-colors " + (isActive ? "bg-primary/10 text-primary dark:bg-primary/20" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#334155]/50");
    const a = h("a", { class: classes, href: "#" + link.path }, link.label);
    a.addEventListener("click", (e) => { e.preventDefault(); setCurrentPage(link.path); router.navigate(link.path); });
    return a;
  }

  const desktopLinks = NAV_LINKS.map((l) => makeLink(l, false));
  const mobileLinks = NAV_LINKS.map((l) => makeLink(l, true));

  const cartBtn = h("button", { class: "relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors", "aria-label": "Carrito" });
  cartBtn.innerHTML = iconSvg(ICONS.cart, "w-5 h-5 text-gray-500 dark:text-gray-300");

  const logo = h("a", { class: "flex items-center gap-2", href: "#/" },
    h("div", { class: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center" }, h("span", { class: "text-white font-bold text-sm" }, "AH")),
    h("span", { class: "text-lg font-bold text-gray-900 dark:text-white font-montserrat" }, "AgentHub")
  );
  logo.addEventListener("click", (e) => { e.preventDefault(); setCurrentPage("/"); router.navigate("/"); });

  return h("nav", { class: "sticky top-0 z-40 bg-white/90 dark:bg-neutral/90 backdrop-blur-md border-b border-gray-200 dark:border-[#334155]/50" },
    h("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
      h("div", { class: "flex items-center justify-between h-16" },
        logo,
        h("div", { class: "hidden md:flex items-center gap-1" }, ...desktopLinks),
        h("div", { class: "flex items-center gap-3" }, DarkModeToggle(), cartBtn)
      )
    ),
    h("div", { class: "md:hidden flex items-center justify-around px-2 pb-2" }, ...mobileLinks)
  );
}
