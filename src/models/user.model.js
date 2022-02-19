const bcrypt = require("bcrypt");
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const hashPassword = (password) => {
    bcrypt.hash(myPlaintextPassword, function(err, hash) {
        // Store hash in your password DB.
    });
}