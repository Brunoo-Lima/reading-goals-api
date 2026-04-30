import { Router, type IRouter } from 'express';
import { userRoutes } from './user';
import { bookRoutes } from './book';

const routes: IRouter = Router();

routes.use(userRoutes);
routes.use(bookRoutes);

export { routes };
