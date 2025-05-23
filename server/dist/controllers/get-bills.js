import { billsSchema } from '../schemas';
export const getBillsController = async (app, { pgClient }) => {
    app.withTypeProvider().get('/bills', {
        schema: {
            response: {
                '2xx': billsSchema,
            },
        },
    }, async () => {
        try {
            const { rows } = await pgClient.query('SELECT id, amount, date, vendor_name as "vendorName" FROM bills ORDER BY date DESC');
            return { bills: rows };
        }
        catch (error) {
            throw error;
        }
    });
};
