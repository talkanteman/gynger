import { parse } from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid';
import { fastifyFile, billsSchema } from '../schemas';
export const uploadBillsController = async (app, { pgClient }) => {
    app.withTypeProvider().post('/bills', {
        schema: {
            body: { file: fastifyFile },
            response: {
                '2xx': billsSchema,
            },
        },
    }, async (request, reply) => {
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
            const bills = [];
            const errors = [];
            for (const record of records) {
                const amount = parseFloat(record.Amount);
                const date = record.Date;
                const vendorName = record['Vendor Name'];
                if (isNaN(amount) || !date || !vendorName) {
                    errors.push(`Invalid record: ${JSON.stringify(record)}`);
                    continue;
                }
                // Check for duplicates
                const duplicateResult = await pgClient.query('SELECT * FROM bills WHERE amount = $1 AND date = $2 AND vendor_name = $3', [amount, date, vendorName]);
                if (duplicateResult.rows.length === 0) {
                    const bill = {
                        id: uuidv4(),
                        amount,
                        date,
                        vendorName
                    };
                    await pgClient.query('INSERT INTO bills (id, amount, date, vendor_name) VALUES ($1, $2, $3, $4)', [bill.id, bill.amount, bill.date, bill.vendorName]);
                    bills.push(bill);
                }
            }
            return {
                bills,
                errors: errors.length > 0 ? errors : undefined
            };
        }
        catch (error) {
            request.log.error(error);
            reply.statusCode = 500;
            return reply.send({ error: 'Internal server error' });
        }
    });
};
