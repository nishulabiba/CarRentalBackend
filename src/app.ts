import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandlers from './app/middlewares/globalErrorHadlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes

app.use('/api', router);

app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('This server is working fine!!!!!!!!!');
});
app.use(globalErrorHandlers);
export default app;
