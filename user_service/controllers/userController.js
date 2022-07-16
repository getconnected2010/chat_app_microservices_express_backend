const pool = require('../database/dbConfig')

exports.login = (req, res)=>{
    const{username, password} = req.body
    res.status(200).json({msg:"successful login"})
}

exports.signup = (req, res, next)=>{
    const {username, hashedPassword} = req.body;
    const signupSql = "INSERT into user (username, password) values (?,?)"
    pool.getConnection((err, connection)=>{
        if(err) return res.status(500).json({msg:'Server error processing signup.'})
        connection.query(signupSql, [username, hashedPassword], (err, result)=>{
            connection.release
            if(err && err.code && err.code === 'ER_DUP_ENTRY') return res.status(409).json({msg:'username already exists.'})
            if(err) return res.status(500).json({msg:'Server error processing signup'})
            if(result.affectedRows===1) return res.status(200).json({msg:'successfully signed up'})
            return res.status(500).json({msg:'error processing signup'})
        })
    })
}