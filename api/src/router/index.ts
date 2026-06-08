import { Router, type IRouter } from 'express';
import { userRoutes } from './users';
import { bookRoutes } from './books';
import { authRoutes } from './auth';
import { readingLogRoutes } from './reading-logs';
import { goalRoutes } from './goals';
import { noteRoutes } from './notes';

const routes: IRouter = Router();

routes.use('/api/users', userRoutes);
routes.use('/api/books', bookRoutes);
routes.use('/api/auth', authRoutes);
routes.use('/api/reading-logs', readingLogRoutes);
routes.use('/api/goals', goalRoutes);
routes.use('/api/notes', noteRoutes);

export { routes };
