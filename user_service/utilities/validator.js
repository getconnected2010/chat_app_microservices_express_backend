const {check, validationResult} = require('express-validator')

//express validator middleware to check user input
exports.validatorResult = (req, res, next) =>{
    //collects all errors found during validation
    const result = validationResult(req)
    //if result has collected errors, an error respose is sent.
    if(!result.isEmpty()){
        if(result.errors[0].msg) return res.status(422).json({msg: result.errors[0].msg})
        res.status(422).json({msg: 'server deteced invalid input.'})
        return
    }
    next();
}

//validates password input
exports.password = [
    check('password')
    .trim()
    .notEmpty().withMessage('password field cannot be empty')
    .isLength({min:4, max:20}).withMessage('password should be between 4 and 20 characters long.')
    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/).withMessage('password can only contain letters, numbers and special characters !@#$*+=:.')
]

//validates username input
exports.username = [
    check('username')
    .trim()
    .notEmpty().withMessage('username cannot be empty')
    .isLength({min:4, max:12}).withMessage('usename should be between 4 and 12 characters long.')
    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/).withMessage('username can only contain numbers and letters.')
]
