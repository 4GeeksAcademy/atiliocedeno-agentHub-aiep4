import { Link, useLocation } from 'react-router-dom';

const SIDEBAR_LINKS = [
  { label: 'Inicio', path: '/', icon: '🏠' },
  { label: 'Explore', path: '/explore', icon: '🔎' },
  { label: 'Agentes', path: '/agentes', icon: '🤖' },
  { label: 'Chat', path: '/chat', icon: '💬' },
  { label: 'Metrics', path: '/metrics', icon: '📊' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-100 dark:bg-[#1E293B] border-r border-gray-200 dark:border-[#334155]/50 h-[calc(100vh-4rem)] sticky top-16 p-4">
      <nav className="flex flex-col gap-1">
        {SIDEBAR_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === link.path
                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#334455]/50'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}