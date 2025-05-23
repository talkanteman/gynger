import { FastifyPluginAsync } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { parse } from 'csv-parse/sync';
import { Bill } from '../types.js';
import { billsSchema } from '../schemas.js';
import { findDuplicateBills, addBill } from '../db/internal.js';
import { getDate } from '../utils/parse-date.js';

export const uploadBillsController: FastifyPluginAsync = async (app) => {
    app.withTypeProvider<JsonSchemaToTsProvider>().post(
        '/bills',
        {
            schema: {
                consumes: ['multipart/form-data'],
                response: {
                    '2xx': billsSchema,
                },
            },
        },
        async (request, reply) => {
            try {
                const data = await request.file();
                if (!data) {
                    return reply.code(400).send({ error: 'No file uploaded' });
                }

                const buffer = await data.toBuffer();
                const records = parse(buffer, {
                    columns: true,
                    skip_empty_lines: true
                });

                const bills: Bill[] = [];
                const errors: string[] = [];

                for (const record of records) {
                    const amount = parseFloat(record.Amount);
                    const date = getDate(record.Date);
                    const vendorName = record['Vendor Name'];

                    if (isNaN(amount) || !date || !vendorName) {
                        errors.push(`Invalid record: ${JSON.stringify(record)}`);
                        continue;
                    }

                    // Check for duplicates
                    const duplicateResult = findDuplicateBills({ amount, date, vendorName });
                    if (!duplicateResult) {
                        const bill = addBill({
                            amount,
                            date,
                            vendorName
                        });

                        bills.push(bill);
                    }
                }

                return {
                    bills,
                    errors: errors.length > 0 ? errors : undefined
                };
            } catch (error) {
                request.log.error(error);
                reply.statusCode = 500;
                return reply.send({ error: 'Internal server error' });
            }
        }
    )
}
