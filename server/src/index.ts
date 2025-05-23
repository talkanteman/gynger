import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { getBillsController } from './controllers/get-bills.js';
import { uploadBillsController } from './controllers/upload-bills.js';

async function main() {
  // Initialize database

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
  fastify.register(uploadBillsController);
  fastify.register(getBillsController);

  await fastify.listen({ port: 3001, host: '0.0.0.0' });

  return fastify;
}

// Start the server
main().catch(async (err) => {
  try {
    console.error(`Webserver crashed: ${err.stack || err.toString()}`)
  } finally {
    process.exit(1)
  }
})
