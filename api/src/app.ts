import express, { type Application } from 'express';
import cors from 'cors';
import { routes } from './router';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(routes);

export { app };
