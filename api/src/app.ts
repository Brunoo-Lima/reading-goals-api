import express, { type Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './router';
import fs from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.API_URL_FRONTEND, // URL exata front
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(routes);

const swaggerDocument = JSON.parse(
  fs.readFileSync(join(__dirname, '../docs/swagger.json'), 'utf8'),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app };
