import { createContext, useEffect, useState } from 'react';
import type { ICreateGoal, IGoal } from '@/@types/IGoal';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { getGoals, useCreateGoal, useDeleteGoal } from '@/services/goal';

interface IGoalsContext {
  goals: IGoal[];

  goal: IGoal | null;
  selectedGoalId: string | null;
  setSelectedGoalId: React.Dispatch<React.SetStateAction<string | null>>;

  addGoal: (goal: ICreateGoal, bookId?: string) => Promise<ICreateGoal>;
  // updateGoal: (id: string, updates: ICreateGoal) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  toggleGoalActive: () => void;
}

export const GoalsContext = createContext<IGoalsContext | undefined>(undefined);

export const GoalsProvider = ({ children }: React.PropsWithChildren) => {
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [goal, setGoal] = useState<IGoal | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const createGoalService = useCreateGoal();
  const deleteGoalService = useDeleteGoal();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getGoals();
        setGoals(response);
      } catch (error) {
        console.error(error);
        toast.error(
          'Erro ao buscar metas. Por favor, tente novamente mais tarde.',
        );
      }
    };

    if (isAuthenticated) {
      fetchGoals();
    }
  }, [setGoals, isAuthenticated]);

  const addGoal = async (goal: ICreateGoal, bookId?: string) => {
    const newGoal: ICreateGoal = {
      ...goal,
      start_date: new Date(),
      book_id: bookId || null,
    };

    const createdGoal = await createGoalService.mutateAsync({
      data: newGoal,
      bookId,
    });
    setGoals((prev) => [...prev, createdGoal]);

    return createdGoal;
  };

  // const updateGoal = async (id: string, updates: ICreateGoal) => {
  //   await updateBookService.mutateAsync(
  //     { id, book: updates },
  //     {
  //       onSuccess: () => {
  //         setGoals((prev) =>
  //           prev.map((book) =>
  //             book.id === id ? { ...book, ...updates } : book,
  //           ),
  //         );
  //         toast.success('Meta atualizada com sucesso!');
  //       },
  //     },
  //   );
  // };

  const deleteGoal = async (id: string) => {
    try {
      await deleteGoalService.mutateAsync(id, {
        onSuccess: () => {
          setGoals((prev) => prev.filter((book) => book.id !== id));

          setTimeout(() => {
            toast.success('Meta deletada com sucesso!');
          }, 100);
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const toggleGoalActive = () => {};

  const contextValue = {
    goals,
    goal,
    selectedGoalId,
    setSelectedGoalId,
    addGoal,
    // updateGoal,
    deleteGoal,
    toggleGoalActive,
  };

  return (
    <GoalsContext.Provider value={contextValue}>
      {children}
    </GoalsContext.Provider>
  );
};
