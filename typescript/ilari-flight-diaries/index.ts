import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send(`Pong!`);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
