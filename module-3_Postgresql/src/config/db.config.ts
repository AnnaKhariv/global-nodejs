import { DB_CONNECTION_STRING } from 'dotenv/config';
import { Options } from 'sequelize';

interface DbConfig {
    uri?: string,
    options: Options
}

export const dbConfig: DbConfig = {
    uri: DB_CONNECTION_STRING || 'postgres://hgetrgyw:bDWXfPJU57QaF0GuFfrx7_Ko-22qGHj2@drona.db.elephantsql.com:5432/hgetrgyw',
    options: {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: true
        }
    }
};
