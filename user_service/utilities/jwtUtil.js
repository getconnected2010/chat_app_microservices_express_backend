const jwt = require('jsonwebtoken')

exports.verifyUsernameEmail = (req, res, next)=>{
    const {token} = req.params
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        req.body.decodedUser = decoded
        next()
    } catch (error) {
        if(error&& error.name==='TokenExpiredError') return res.status(403).json({msg:'Your token has expired. Try again. ????'})
        res.status(500).json({msg:'error processing your tokens.'})
    }
}