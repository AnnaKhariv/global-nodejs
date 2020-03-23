import { Sequelize } from 'sequelize';
import express from 'express';
import { Router } from '../server/routes';
import { errorHandlerMiddleware } from '../middleware/error-handling.middleware';
import { config } from '../config';

import { UserController } from '../app/user/user.controller';
import { UserService } from '../app/user/user.service';

export const startServer = async (connection: Sequelize): Promise<express.Express> => {
    const app = express();
    const service: UserService = new UserService(connection);
    const controller: UserController = new UserController(service);
    const { router } = new Router(controller);

    app.use(express.json());
    app.use('/api', router);
    app.use(errorHandlerMiddleware);
    app.listen(config.port);

    return app;
};

export const stopServer = (err: Error): void => {
    console.log(err);
    process.exit(1);
};
