/**
 * DarkModeToggle component
 */
import { h, ICONS, iconSvg } from '../../lib/dom.js';
import { store, toggleDarkMode } from '../../lib/appState.js';

export function DarkModeToggle() {
  const btn = h('button', {
    class: 'p-2 rounded-lg bg-gray-200 dark:bg-[#334155] hover:bg-gray-300 dark:hover:bg-[#475569] transition-colors',
    'aria-label': 'Cambiar a modo claro',
  });

  function updateIcon() {
    btn.innerHTML = store.get('darkMode')
      ? iconSvg(ICONS.sun, 'w-5 h-5 text-yellow-400')
      : iconSvg(ICONS.moon, 'w-5 h-5 text-gray-600');
    btn.setAttribute('aria-label', store.get('darkMode') ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }

  updateIcon();
  btn.addEventListener('click', toggleDarkMode);
  store.subscribe('darkMode', updateIcon);

  return btn;
}