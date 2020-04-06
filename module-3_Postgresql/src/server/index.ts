import { Sequelize } from 'sequelize-typescript';
import express from 'express';
import cors from 'cors';
import log from '../logger';
import { Router } from '../server/routes';
import { errorHandlerMiddleware } from '../middleware/error-handling.middleware';
import { loggerHandlerMiddleware } from '../middleware/logger-handling.middleware';
import { authHandlerMiddleware } from '../middleware/auth-handling.middleware';
import { config } from '../config';
import { corsOptions } from '../config/cors.config';

import { UserController } from '../app/user/user.controller';
import { UserService } from '../app/user/user.service';
import { GroupController } from '../app/group/group.controller';
import { GroupService } from '../app/group/group.service';

export const startServer = async (connection: Sequelize): Promise<express.Express> => {
    const app = express();
    const userService: UserService = new UserService(connection);
    const groupService: GroupService = new GroupService(connection);

    const { router } = new Router(
        new UserController(userService),
        new GroupController(groupService)
    );

    app.use(cors(corsOptions));
    log.warn('CORS-enabled for all origins!');

    app.use(express.json());
    app.use(loggerHandlerMiddleware);
    app.use(authHandlerMiddleware);
    app.use('/api', router);
    app.use(errorHandlerMiddleware);
    app.listen(config.port);

    process.on('uncaughtException', err => stopServer(err));
    process.on('unhandledRejection', (reason) => stopServer(reason));

    return app;
};

export const stopServer = (err: Error | {}): void => {
    log.error(err, 'Gracefully shutdown');
    process.exit(1);
};
