import { Pool } from 'pg';

const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'medusa-db-rcijl',
    // password: 'abbas',
    // port: 5433,
    connectionString: process.env.DATABASE_URL,
});

export default pool;
