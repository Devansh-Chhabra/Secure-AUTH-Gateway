import jwt from "jsonwebtoken"

export const verifyToken = async (req,res,next) => {
    const token = req.cookies.token;
    try{
        if(!token){
            throw new Error("Unauthorized: Invalid Token");
        }
        
        const decoded = jwt.decode(token,process.env.JWT_SECRET);
        if(!decoded){
            throw new Error("Unauthorized: Invalid Token");
        }

        req.userId = decoded.userId;
        next();
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}