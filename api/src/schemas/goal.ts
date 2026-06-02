import { z } from 'zod';
import { GoalsType } from '../../generated/prisma/enums';

export const createGoalSchema = z.strictObject(
  {
    user_id: z.string('User id is required').min(1, {
      error: 'User id is required',
    }),
    type: z.enum(GoalsType, {
      error: 'Type is required',
    }),
    target_value: z
      .number({
        message: 'Target value is required',
      })
      .min(1, { error: 'Target value is required' }),
    start_date: z.iso.datetime({
      error: 'Date must be a valid date',
    }),
    end_date: z.iso.datetime().optional(),
  },
  {
    error: 'Some provided field is not allowed.',
  },
);

export const updateGoalSchema = createGoalSchema.partial().refine(
  (data) => {
    if (data.start_date && data.end_date) {
      return data.end_date >= data.start_date;
    }

    return true;
  },
  {
    message: 'End date must be greater than or equal to start date',
  },
);
