import pool from '../config/database';
export async function initializeDatabase() {
    const client = await pool.connect();
    try {
        // Create bills table
        await client.query(`
      CREATE TABLE IF NOT EXISTS bills (
        id UUID PRIMARY KEY,
        amount DECIMAL(10,2) NOT NULL,
        date DATE NOT NULL,
        vendor_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Database initialized successfully');
        return client;
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
    finally {
        client.release();
    }
}
