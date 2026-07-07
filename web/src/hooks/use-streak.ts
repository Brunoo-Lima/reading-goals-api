import { useContext } from 'react';
import { StreakContext } from '@/context/streak-context';

export const useStreak = () => {
  const context = useContext(StreakContext);

  if (!context) {
    throw new Error('useStreak must be used within a StreakProvider');
  }

  return context;
};
