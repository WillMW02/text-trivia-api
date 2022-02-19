import pg from 'pg';

const pool = new pg.Pool();

export const connect = cb => pool.connect(cb);
