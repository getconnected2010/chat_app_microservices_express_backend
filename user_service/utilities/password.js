const bcrypt = require('bcryptjs')

//creates a password hash from the user input.
exports.hash = (req, res, next)=>{
    const {password} = req.body
    const salt = Number(process.env.BCRYPT_SALT)
    bcrypt.hash(password, salt, (err, hashed)=>{
        if(err) return res.status(500).json({msg:'server error processing password.'})
        req.body.hashedPassword = hashed;
        next()
    })
}