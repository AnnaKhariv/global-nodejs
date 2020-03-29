import { createLogger } from 'bunyan';
import { config } from '../config/logger.config';

class Logger {
    constructor(
        readonly log = createLogger(config)
    ) {}
}

export =  new Logger().log;
