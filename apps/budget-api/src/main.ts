import { default as cors } from 'cors';
import { default as express } from 'express';
import { join as pathJoin } from 'path';

const app = express();

app.use(cors());

app.use('/assets', express.static(pathJoin(__dirname, 'assets')));

app.get('/api', (_req, res) => {
  res.send({ message: 'Welcome to budget-api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
