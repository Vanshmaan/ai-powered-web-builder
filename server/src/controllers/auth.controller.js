import * as authService from '../services/auth.service.js';

export const registerUser = async (req,res,next) => {
    try {
        const { name,email,password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message : "Name, email and password are required" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message : "Password must be at least 6 characters" });
        }
        const result = await authService.register(name,email,password);
        res.status(201).json({success : true, data: result });
    } catch (error) {
        if(error.statusCode) return res.status(error.statusCode).json({ message : error.message });
        next(error);
    }
}

export const loginUser = async (req,res,next) => {
    try {
        const { email,password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message : "Email and password are required" });
        }
        const result = await authService.emailLogin(email,password);
        res.status(200).json({ success : true, data : result });
    }
    catch (error) {
        if(error.statusCode) return res.status(error.statusCode).json({success : false, message : error.message });
        next(error);
    }

}

export const getMe = async (req,res,next) => {
    try{
        const user = await authService.getUserProfile(req.user._id);
        return res.json({ success : true, data : user });
    }
    catch(error){
        next(error);
    }
}

export const logout = (req,res) => {
    res.json({ success : true, message : "Logged out successfully" });
}