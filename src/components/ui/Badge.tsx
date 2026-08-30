import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'yellow' | 'red';
}

const colorMap = {
  primary: 'bg-primary/20 text-primary',
  secondary: 'bg-secondary/20 text-secondary',
  tertiary: 'bg-tertiary/20 text-tertiary',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  red: 'bg-red-500/20 text-red-400',
};

export default function Badge({ children, color = 'primary' }: BadgeProps) {
  return (
    <span className={`pill ${colorMap[color]}`}>
      {children}
    </span>
  );
}