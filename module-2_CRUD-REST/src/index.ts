import express from 'express';
import { router } from './server/routes';
import { errorHandlerMiddleware } from './server/error-handling';
import { config } from './config';

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandlerMiddleware);
app.listen(config.port);
