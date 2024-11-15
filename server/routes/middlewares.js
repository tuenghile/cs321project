const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                if (refreshToken) {
                    // Create a new access token if the refresh token exists
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                        if (err) return res.sendStatus(403);

                        // Remove the exp property from the user object
                        const { exp, ...userWithoutExp } = user;
                        const newAccessToken = jwt.sign(userWithoutExp, process.env.ACCESS_TOKEN, { expiresIn: '10m' });
                        res.cookie("access_token", newAccessToken, { httpOnly: true, secure: true });
                        req.user = userWithoutExp;
                        return next();
                    });
                } else {
                    return res.sendStatus(403); // No valid tokens found
                }
            } else {
                req.user = user;
                return next();
            }
        });
    } else if (refreshToken) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return res.sendStatus(403);

            // Remove the exp` property from the user object
            const { exp, ...userWithoutExp } = user;
            const newAccessToken = jwt.sign(userWithoutExp, process.env.ACCESS_TOKEN, { expiresIn: '10m' });
            res.cookie("access_token", newAccessToken, { httpOnly: true, secure: true });
            req.user = userWithoutExp;
            return next();
        });
    } else {
        return res.sendStatus(403); // No valid tokens found
    }
};

module.exports = authenticateToken;
