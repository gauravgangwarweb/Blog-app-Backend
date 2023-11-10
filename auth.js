import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        // Verify the JWT token from the request headers
        const {token}= req.body
        const decodedToken = jwt.verify(token, process.env.SECRET);

        // Set the decoded token on the request object for future use
        req.decodedToken = decodedToken;
        
        next(); // Call the next middleware or endpoint handler
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized access vv' });
    }
};

export default auth;