
import { initDb } from './db/models';
import { startServer, stopServer } from './server';

(async () => {
    try {
        const connection = await initDb();
        await connection.authenticate();
        await startServer(connection);
        console.log('Connection has been established successfully');
    } catch (err) {
        stopServer(err);
    }
})();
