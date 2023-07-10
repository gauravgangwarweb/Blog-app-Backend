import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const auth = async (req, next, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    console.log(token)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = decoded;

        next();
    });
}

export default auth