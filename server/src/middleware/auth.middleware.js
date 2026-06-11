import {verifyToken} from '../utils/jwt.utils.js';
import User from '../models/User.model.js';

const authenticate = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message : "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({success : false, message : "User not found,Please login again" });
        }
        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({ success : false, message : "Invalid token" });
    }
}
export default authenticate;