import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized", success: false});
        };
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({message: "Invalid token", success: false});
        };

        req.id = decode.id;
        next();
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong", success: false});
    }
    
}

export default isAuthenticated;