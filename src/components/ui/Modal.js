/**
 * Modal component
 */
import { h, ICONS, iconSvg } from '../../lib/dom.js';
import { closeModal } from '../../lib/appState.js';

export function Modal(title, body) {
  const overlay = h('div', { class: 'fixed inset-0 z-50 flex items-center justify-center p-4' });

  const backdrop = h('div', { class: 'absolute inset-0 bg-black/60 backdrop-blur-sm' });
  backdrop.addEventListener('click', closeModal);

  const closeBtn = h('button', {
    class: 'p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors',
    'aria-label': 'Cerrar',
  });
  closeBtn.innerHTML = iconSvg(ICONS.close, 'w-5 h-5 text-gray-500 dark:text-gray-400');
  closeBtn.addEventListener('click', closeModal);

  const modal = h('div', { class: 'relative bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-2xl p-6 max-w-lg w-full shadow-2xl' },
    h('div', { class: 'flex items-center justify-between mb-4' },
      h('h3', { class: 'text-lg font-semibold text-gray-900 dark:text-white' }, title),
      closeBtn
    ),
    body
  );

  overlay.appendChild(backdrop);
  overlay.appendChild(modal);

  document.body.style.overflow = 'hidden';

  return overlay;
}