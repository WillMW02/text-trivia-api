import { Pool } from 'pg';

const pool = new Pool();

export const connect = cb => pool.connect(cb);
