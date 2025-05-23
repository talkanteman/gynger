import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'gynger',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
});
// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    }
    else {
        console.log('Successfully connected to PostgreSQL database');
        release();
    }
});
export default pool;
