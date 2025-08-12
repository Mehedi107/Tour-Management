import express, { json, Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/errorHelpers/notFound';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('hello');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
