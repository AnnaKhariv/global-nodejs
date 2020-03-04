import { PORT, LIMIT } from 'dotenv/config';

export const config = {
    port: PORT || 3000,
    limit: LIMIT || 5
};
