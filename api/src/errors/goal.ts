export class GoalNotFoundError extends Error {
  constructor(goalId?: string) {
    super(`Goal with id ${goalId ?? 'unknown'} not found`);
    this.name = 'GoalNotFoundError';
  }
}

export class GoalProgressExceedsTargetError extends Error {
  constructor() {
    super('Goal progress cannot exceed target value');
    this.name = 'GoalProgressExceedsTargetError';
  }
}
