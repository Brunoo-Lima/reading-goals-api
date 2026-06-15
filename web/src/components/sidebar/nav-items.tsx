import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  TargetIcon,
  UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Geral', icon: LayoutDashboardIcon },
  { href: '/livros', label: 'Livros', icon: BookOpenIcon },
  { href: '/metas', label: 'Metas', icon: TargetIcon },
  { href: '/conta', label: 'Conta', icon: UserIcon },
];

interface INavItemsProps {
  onClose: () => void;
}

export const NavItems = ({ onClose }: INavItemsProps) => {
  const location = useLocation();

  return (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <NavLink
            to={item.href}
            key={item.href}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
