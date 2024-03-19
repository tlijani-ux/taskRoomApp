const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.token; // Corrected req.cookie.token to req.cookies.token

        if (!token) {
            const decodedToken = jwt.verify(token, process.env.JWT_secret);
                
            const resp= await User.findById(decodedToken.userId).select("isAdmin email");

            req.user = {
             
                email:resp.email,
                isAdmin:resp.isAdmin,
                userId:decodedToken.userId,
            }
        }
        // Call next() if token exists and verification succeeds
        next();
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(401).json({ error: 'not authorized , try login' });
    }
}

const isAdminRoute = (req,res,next)=>{

    if(req.user && req.user.isAdmin){
        next();
    }else{
          
        return res.status(401).json({
            status:false,
            message:"Not auth as admin , login as admin "
        })


    }



}









module.exports = {
    protectRoute,
    isAdminRoute
} 

