import { APP_NAME, LOG_LEVEL } from 'dotenv/config';
import { LoggerOptions, INFO } from 'bunyan';

export const config: LoggerOptions = {
    name: APP_NAME || 'Global Node.js mentoring',
    level: LOG_LEVEL || INFO,
    stream: process.stdout
};
