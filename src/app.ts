import express, { json, Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('hello');
});

app.use(globalErrorHandler);

export default app;
