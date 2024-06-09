import express from 'express';
import { json } from 'body-parser';
import { routes } from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
