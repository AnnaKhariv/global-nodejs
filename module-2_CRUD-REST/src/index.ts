import express from 'express';
import { router } from './server/routes';
import { config } from './config';

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(config.port);