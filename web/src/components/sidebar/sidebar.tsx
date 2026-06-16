'use client';

import { cn } from '@/lib/utils';
import { BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StreakCard } from './streak-card';
import { NavLink } from 'react-router-dom';
import { NavItems } from './nav-items';
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
  const { open, setOpen } = useAuth();

  function onClose() {
    setOpen(false);
  }

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-max w-64 bg-card border-r border-border/50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0',
          // open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <strong className="text-lg font-bold text-foreground">
              Minha Estante
            </strong>
          </div>
        </div>

        <StreakCard />

        <NavItems onClose={onClose} />

        <div className="p-4 border-t border-border/50">
          <NavLink to="/chat">
            <Button
              variant="outline"
              className="w-full gap-2 justify-start"
              onClick={onClose}
            >
              <MessageCircle className="h-5 w-5" />
              Assistente IA
            </Button>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
