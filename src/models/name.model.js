import * as PgSQL from '../lib/pgsql.js';

PgSQL.connect((err, client, done) => {
    // deal with code
    client.query('SELECT * FROM *');
    done();
});

