const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const FRONT_END_URL = "http://localhost:8000";

const sendEmail = async (username, email)=>{
    let token = null
    //sign the token 
    try {
        token = jwt.sign({username, email}, process.env.JWT_TOKEN, {expiresIn: 60*1})
    } catch (error) {
        console.log('error signing jwt', error)
    }

    //email message body. if token is created, it sends it as email with link to hit front end '/activate' route.
    let emailBody;
    if(token){
        emailBody = `<div>Click on the link below to activate your account.</div>
                     <div><a href='${FRONT_END_URL}/user/activate/${token}'><b>Activate my account.</b></a></div>`
    } else{
        emailBody = `<div>Error creating token to activate your account. Please contact admin.</div>`
    }
    //send the email
    const transporter = nodeMailer.createTransport({
        service: 'outlook',
        auth:{
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })
    const options = {
        from:'mysmallmarket@outlook.com',
        to: email,
        subject: 'Account activation',
        html: emailBody
    }
    transporter.sendMail(options, (err, info)=>{
        if(err) return console.log('server error contacting seller')
        if(info.rejected.length===0) return console.log('message successfully sent to seller')
        console.log('message rejected by seller email address') 
    })
}

module.exports=sendEmail;