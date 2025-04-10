import express from 'express';
import { calculator, Operation } from './calculator';
import { toPositiveNumber } from './utils';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { number1, number2, operation } = req.body;

  try {
    const result = calculator(
      toPositiveNumber(number1),
      toPositiveNumber(number2),
      operation as Operation
    );
    res.send({ result });
  } catch (e) {
    res
      .status(400)
      .json({ error: e instanceof Error ? e.message : 'something went wrong' });
  }
});

const PORT: number = 3003;
app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));
