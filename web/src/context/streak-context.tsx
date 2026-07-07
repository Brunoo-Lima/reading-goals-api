import type { IStreak } from '@/@types/IStreak';
import { createContext, useState } from 'react';

interface IStreakContext {
  streak: IStreak;
  setStreak: (streak: IStreak) => void;
}

export const StreakContext = createContext<IStreakContext | undefined>(
  undefined,
);

export const StreakProvider = ({ children }: React.PropsWithChildren) => {
  const [streak, setStreak] = useState<IStreak>({
    currentStreak: 0,
    lastReadDate: null,
    longestStreak: 0,
  });

  const contextValue = {
    streak,
    setStreak,
  };

  return (
    <StreakContext.Provider value={contextValue}>
      {children}
    </StreakContext.Provider>
  );
};
