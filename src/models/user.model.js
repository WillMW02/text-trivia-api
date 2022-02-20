import * as PgSQL from "../lib/pgsql";
import sqlCommands from "../config/sqlCommands.json";
import logger from "../lib/logger";

const bcrypt = require("bcrypt");
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const hashPassword = (password) => {
    bcrypt.hash(myPlaintextPassword, function(err, hash) {
        // Store hash in your password DB.
    });
}

export const get = async (id = null) => {
    const client = await PgSQL.connect();
    try {
        const res = await client.query(
            id?sqlCommands.users.getUser:sqlCommands.users.,
            id?[id]:null
        );
        return res.rows[0];
    } catch(err) {
        logger.error(err, true);
        throw new Error('An error occurred whilst fetching a question');
    } finally {
        if(client) client.release();
    }
};