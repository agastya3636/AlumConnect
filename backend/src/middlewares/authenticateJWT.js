import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    console.error('JWT verification error:', err);
                    return res.sendStatus(403);  // Forbidden
                }
    
                if (!user || !user.userId) {
                    console.error('JWT token does not contain userId');
                    return res.sendStatus(403);  // Forbidden
                }
    
                req.user = user;  // Attach user info to req
                next();
            });
        } else {
            console.error('No Authorization header provided');
            res.sendStatus(401);  // Unauthorized
        }
    };
export { authenticateJWT };
