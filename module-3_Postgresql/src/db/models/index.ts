import { Sequelize } from 'sequelize';
import { config } from '../../config';
import { dbConfig } from '../../config/db.config';
import * as envDbConfig from '../../config/db.json';
import { defineUserModel } from './user';

const { uri, options } = dbConfig;

export const initDb = async (): Promise<Sequelize> => {
    const sequelize = !uri ? new Sequelize(envDbConfig[config.env])
        : new Sequelize(uri, options);

    defineUserModel(sequelize);
    return sequelize;
};
