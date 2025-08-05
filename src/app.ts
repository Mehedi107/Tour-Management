import express, { json } from 'express';
import cors from 'cors';
import { router } from './app/routes';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1', router);

app.get('/', async (req, res) => {
  res.send('hello');
});

export default app;
