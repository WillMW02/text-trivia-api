// export const method = (req, res, next) => {}

// Verify user credentials
export const login = (req, res, next) => {
    const username = req.body.username;
    const pass = req.body.pass;

    // ...

    // If valid credentials, set cookie
    res.cookie(
        'jwt',
        generateJWT(username),
        {
            httpOnly: true,
        }
    );
    res.sendStatus(200);
}