import express, { json } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.routes';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1/user', userRoute);

app.get('/', async (req, res) => {
  res.send('hello');
});

export default app;
