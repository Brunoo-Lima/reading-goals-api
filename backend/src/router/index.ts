import { Router, type IRouter } from 'express';
import { userRoutes } from './user';

const routes: IRouter = Router();

routes.use(userRoutes);

export { routes };
