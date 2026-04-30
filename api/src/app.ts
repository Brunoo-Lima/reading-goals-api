import express, { type Application } from 'express';
import { routes } from './router';

const app: Application = express();
app.use(express.json());
app.use(routes);

export { app };
