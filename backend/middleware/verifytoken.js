import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"Unathutherized - no token provided"})

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({message:"invalid token"})
        
        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log("error in verifying token",error);
        res.status(500).json({message:"Internal Server Error"})
    }

}