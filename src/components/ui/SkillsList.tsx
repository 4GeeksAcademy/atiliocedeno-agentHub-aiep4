import { useState } from 'react';
import Badge from '../ui/Badge';

interface SkillsListProps {
  skills: string[];
  initialVisible?: number;
}

const skillColors = ['primary', 'secondary', 'tertiary', 'yellow'] as const;

export default function SkillsList({ skills, initialVisible = 2 }: SkillsListProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? skills : skills.slice(0, initialVisible);
  const hiddenCount = skills.length - initialVisible;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((skill, i) => (
        <Badge key={skill} color={skillColors[i % skillColors.length]}>
          {skill}
        </Badge>
      ))}
      {!expanded && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
        >
          +{hiddenCount} más
        </button>
      )}
      {expanded && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(false)}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
        >
          Mostrar menos
        </button>
      )}
    </div>
  );
}