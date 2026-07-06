import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpenIcon,
  ChartNoAxesCombinedIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  TargetIcon,
  UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { href: '/geral', label: 'Geral', icon: LayoutDashboardIcon },
  { href: '/livros', label: 'Livros', icon: BookOpenIcon },
  { href: '/metas', label: 'Metas', icon: TargetIcon },
  {
    href: '/estatisticas',
    label: 'Estatísticas',
    icon: ChartNoAxesCombinedIcon,
  },
  { href: '/conta', label: 'Conta', icon: UserIcon },
];

interface INavItemsProps {
  onClose: () => void;
}

export const NavItems = ({ onClose }: INavItemsProps) => {
  const location = useLocation();
  const { logOut } = useAuth();

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

      <Button
        variant="ghost"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground w-full h-full justify-start cursor-pointer hover:bg-primary hover:text-primary-foreground"
        onClick={logOut}
      >
        <LogOutIcon className="h-5 w-5" />
        Sair
      </Button>
    </nav>
  );
};
