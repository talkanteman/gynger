import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { getBillsController } from './controllers/get-bills';
import { uploadBillsController } from './controllers/upload-bills';
import { initializeDatabase } from './db/init';
async function main() {
    // Initialize database
    const pgClient = await initializeDatabase();
    const fastify = Fastify({
        logger: true
    });
    // Register plugins
    await fastify.register(cors, {
        origin: true
    });
    await fastify.register(multipart, {
        limits: {
            fileSize: 1024 * 1024 // 1MB
        }
    });
    // Register routes
    fastify.register(uploadBillsController, { pgClient });
    fastify.register(getBillsController, { pgClient });
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    return fastify;
}
// Start the server
main().catch(async (err) => {
    try {
        console.error(`Webserver crashed: ${err.stack || err.toString()}`);
    }
    finally {
        process.exit(1);
    }
});
