/**
 * Badge - pills with color coding
 */
import { h } from '../../lib/dom.js';

const colorMap = {
  primary: 'bg-primary/20 text-primary',
  secondary: 'bg-secondary/20 text-secondary',
  tertiary: 'bg-tertiary/20 text-tertiary',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  red: 'bg-red-500/20 text-red-400',
};

export function Badge(text, color = 'primary') {
  return h('span', { class: `pill ${colorMap[color]}` }, text);
}