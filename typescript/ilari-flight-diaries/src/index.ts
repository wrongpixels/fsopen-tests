import express from 'express';
import diariesRouter from './routes/diaries';

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/api/diaries', diariesRouter);

app.get('/ping', (_req, res) => {
  res.send(`Pong!`);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
