import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './router';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // URL exata front
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(routes);

export { app };
