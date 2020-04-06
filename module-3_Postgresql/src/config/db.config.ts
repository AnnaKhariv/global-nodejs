import { DB_CONNECTION_STRING } from 'dotenv/config';
import * as path from 'path';
import { SequelizeOptions } from 'sequelize-typescript';

interface DbConfig {
    uri?: string,
    options: SequelizeOptions
}

const extension = () => (require.extensions['.ts'] ? '.ts' : '.js');

export const dbConfig: DbConfig = {
    uri: DB_CONNECTION_STRING || 'postgres://hgetrgyw:bDWXfPJU57QaF0GuFfrx7_Ko-22qGHj2@drona.db.elephantsql.com:5432/hgetrgyw',
    options: {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: true
        },
        models: [path.resolve(__dirname, '../', `db/models/**.model${extension()}`)],
        repositoryMode: true,
        logging: false
    }
};
