import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.send('hello');
});

export default app;
