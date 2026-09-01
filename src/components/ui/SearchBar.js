/**
 * SearchBar component
 */
import { h, ICONS, iconSvg } from '../../lib/dom.js';
import { setSearchQuery } from '../../lib/appState.js';

export function SearchBar(placeholder = 'Buscar agentes por skill, nombre...') {
  const input = h('input', {
    type: 'text',
    placeholder,
    class: 'w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-[#334155] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all',
  });

  input.addEventListener('input', () => {
    setSearchQuery(input.value);
  });

  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none';
  iconWrapper.innerHTML = iconSvg(ICONS.search, 'w-5 h-5 text-gray-400');

  const wrapper = h('div', { class: 'relative w-full max-w-md' },
    iconWrapper,
    input
  );

  return wrapper;
}