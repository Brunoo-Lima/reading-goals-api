import { Router, type IRouter } from 'express';
import { userRoutes } from './users';
import { bookRoutes } from './books';
import { authRoutes } from './auth';
import { readingLogRoutes } from './reading-logs';
import { goalRoutes } from './goals';
import { noteRoutes } from './notes';
import { chatRoutes } from './chat';

const routes: IRouter = Router();

routes.use('/api/v1/users', userRoutes);
routes.use('/api/v1/books', bookRoutes);
routes.use('/api/v1/auth', authRoutes);
routes.use('/api/v1/reading-logs', readingLogRoutes);
routes.use('/api/v1/goals', goalRoutes);
routes.use('/api/v1/notes', noteRoutes);
routes.use('/api/v1/chat', chatRoutes);

export { routes };
