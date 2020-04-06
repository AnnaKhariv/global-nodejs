import log from '../../logger';
import { Sequelize } from 'sequelize-typescript';
import { config } from '../../config';
import { dbConfig } from '../../config/db.config';
import * as envDbConfig from '../../config/db.json';

const { uri, options } = dbConfig;

export const initDb = async (): Promise<Sequelize> => {
    log.info('Create database connection...');
    const sequelize = !uri ? new Sequelize(envDbConfig[config.env])
        : new Sequelize(uri, options);

    return sequelize;
};
