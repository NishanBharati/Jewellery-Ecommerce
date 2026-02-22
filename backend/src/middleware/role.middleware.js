const roleMiddleware = (requiredRole)=>{
    return(req,res,next)=>{



        if(req.user.role!==requiredRole){
            return res.status(401).json({
                message:"Access Denied",
            })
        }
        next()
    }
}

export default roleMiddleware