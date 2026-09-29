import { useAuth } from '@/hooks/use-auth';
import { getStreak } from '@/services/streak';
import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback } from 'react';
import type { IStreak } from '@/@types/IStreak';

interface IStreakContext {
  streak: IStreak;
  refreshStreak: () => Promise<void>;
}

export const StreakContext = createContext<IStreakContext | undefined>(
  undefined,
);

const emptyStreak: IStreak = {
  currentStreak: 0,
  lastReadingDate: null,
  longestStreak: 0,
  readToday: false,
};

export const StreakProvider = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated, user } = useAuth();

  const { data: streak = emptyStreak, refetch } = useQuery({
    queryKey: ['reading-streak', user?.id],
    queryFn: getStreak,
    enabled: isAuthenticated,
  });

  const refreshStreak = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const contextValue = {
    streak,
    refreshStreak,
  };

  return (
    <StreakContext.Provider value={contextValue}>
      {children}
    </StreakContext.Provider>
  );
};
