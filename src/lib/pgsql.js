import pg from 'pg';

const pool = new pg.Pool();

export const connect = async cb => pool.connect(cb);
