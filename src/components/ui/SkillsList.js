import { h } from "../../lib/dom.js";
import { Badge } from "./Badge.js";

const SKILL_COLORS = ["primary", "secondary", "tertiary", "yellow", "red"];

export function SkillsList(skills, maxVisible) {
  maxVisible = maxVisible || 3;
  const container = h("div", { class: "flex flex-wrap items-center gap-2" });
  const visible = skills.slice(0, maxVisible);
  const extra = skills.length - maxVisible;

  visible.forEach((skill, i) => container.appendChild(Badge(skill, SKILL_COLORS[i % SKILL_COLORS.length])));

  if (extra > 0) {
    const toggle = h("button", {
      class: "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-[#334155] text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#475569] transition-colors cursor-pointer",
    }, "+" + extra + " más");
    let expanded = false;
    toggle.addEventListener("click", () => {
      expanded = !expanded;
      if (expanded) {
        container.innerHTML = "";
        skills.forEach((s, i) => container.appendChild(Badge(s, SKILL_COLORS[i % SKILL_COLORS.length])));
        toggle.textContent = "Mostrar menos";
        container.appendChild(toggle);
      } else {
        container.innerHTML = "";
        visible.forEach((s, i) => container.appendChild(Badge(s, SKILL_COLORS[i % SKILL_COLORS.length])));
        toggle.textContent = "+" + extra + " más";
        container.appendChild(toggle);
      }
    });
    container.appendChild(toggle);
  }

  return container;
}
