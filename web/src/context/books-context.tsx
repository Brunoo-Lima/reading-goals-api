import type { IStreak } from '@/@types/IStreak';
import { createContext, useState } from 'react';

interface IBooksContext {
  streak: IStreak;
  setStreak: (streak: IStreak) => void;
}

export const BooksContext = createContext<IBooksContext | undefined>(undefined);

export const BooksProvider = ({ children }: React.PropsWithChildren) => {
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
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
