const pool = require('../database/dbConfig')
const sendEmail = require('../utilities/email')


//activate new user from emailed token
exports.activate = (req, res)=>{
    const {username, email} = req.body.decodedUser
    const activateSql = "Update user set active = 'true' where username=? and email=?"
    pool.getConnection((err, connection)=>{
        if(err) return res.status(500).json({msg:'Server error activating your account'})
        connection.query(activateSql, [username, email], (err, result)=>{
            connection.release()
            if(err) return res.status(500).json({msg:'Server error activating your account'})
            if(result.affectedRows===1) return res.status(200).json({msg:'Your account has been activated.'})
            return res.status(500).json({msg:'Server error activating your account'})
        })
    })
}

exports.login = (req, res)=>{
    const{username, password} = req.body
    res.status(200).json({msg:"successful login"})
}

exports.signup = (req, res)=>{
    const {username, hashedPassword, email} = req.body;
    const signupSql = "INSERT into user (username, password, email) values (?,?,?)"
    pool.getConnection((err, connection)=>{
        if(err) return res.status(500).json({msg:'Server error processing signup.'})
        connection.query(signupSql, [username, hashedPassword, email], (err, result)=>{
            connection.release
            if(err && err.code && err.code === 'ER_DUP_ENTRY') return res.status(409).json({msg:'username already exists.'})
            if(err) return res.status(500).json({msg:'Server error processing signup'})
            if(result.affectedRows===1){
                sendEmail(username, email)
                return res.status(200).json({msg:'successfully signed up'})
            } 
            return res.status(500).json({msg:'error processing signup'})
        })
    })
}