import { FastifyPluginAsync } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { billsSchema } from '../schemas.js';
import { getBills } from '../db/internal.js';

export const getBillsController: FastifyPluginAsync = async (app) => {
  app.withTypeProvider<JsonSchemaToTsProvider>().get(
    '/bills',
    {
      schema: {
        response: {
          '2xx': billsSchema,
        },
      },
    },
    async () => {
      try {
        const bills = getBills();
        return { bills };
      } catch (error) {
        throw error;
      }
    })
}