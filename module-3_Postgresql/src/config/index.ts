import { PORT, LIMIT, NODE_ENV } from 'dotenv/config';

export const config = {
    port: PORT || 3000,
    limit: LIMIT || 5,
    env: NODE_ENV || 'development'
};
