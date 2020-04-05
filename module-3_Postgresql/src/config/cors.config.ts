import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: '*',
    credentials: true
}