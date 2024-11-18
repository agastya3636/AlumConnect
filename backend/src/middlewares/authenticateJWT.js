import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; 

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.sendStatus(403); 
            }

            if (!user || !user.userId) {
                console.error('JWT token does not contain userId');
                return res.sendStatus(403); 
            }

            req.user = user; 
            next();
        });
    } else {
        console.error('No JWT token provided in cookies');
        res.sendStatus(401); 
    }
};

export { authenticateJWT };
