/**
 * ActionsDropdown (⋮) component
 */
import { h, ICONS, iconSvg } from '../../lib/dom.js';

export function ActionsDropdown(actions) {
  const container = h('div', { class: 'relative' });
  let isOpen = false;

  const btn = h('button', {
    class: 'p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors',
    'aria-label': 'Acciones',
  });
  btn.innerHTML = iconSvg(ICONS.dots, 'w-5 h-5 text-gray-400');

  const menu = h('div', { class: 'absolute right-0 mt-2 w-44 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl shadow-2xl py-1 z-50 hidden' });

  actions.forEach((action) => {
    const btnAction = h('button', {
      class: `w-full text-left px-4 py-2.5 text-sm transition-colors ${
        action.variant === 'danger'
          ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#334155] hover:text-gray-900 dark:hover:text-white'
      }`,
    }, action.label);
    btnAction.addEventListener('click', () => {
      action.onClick();
      isOpen = false;
      menu.classList.add('hidden');
    });
    menu.appendChild(btnAction);
  });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    menu.classList.toggle('hidden', !isOpen);
  });

  document.addEventListener('mousedown', (e) => {
    if (container && !container.contains(e.target) && isOpen) {
      isOpen = false;
      menu.classList.add('hidden');
    }
  });

  container.appendChild(btn);
  container.appendChild(menu);
  return container;
}