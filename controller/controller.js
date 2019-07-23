const userService = require('../services/services');
const generateToken = require('../middleware/generateToken');
const sendMail = require('../middleware/mail');
const async = require('async')


exports.register = (req, res) => {
    try {
        req.checkBody('firstname', 'first name is not valid').isLength({ min: 2 }).isAlpha()
        req.checkBody('lastname', 'last name is not valid').isLength({ min: 2 }).isAlpha()
        req.checkBody('email', 'email is not valid').isEmail();
        req.checkBody('password', 'password is not valid').isLength({ min: 8 })
        req.checkBody('confirmPassword', 'passwords do not match').equals(req.body.password)
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.success = false;
            return res.status(422).send(response)
        }
        else {
            var dataResponse = {};
            const tasks = [
                function registerUser(callback) {
                    userService.register(req.body, (err, data) => {
                        if (err) {
                            return callback(err);
                        }
                        else {
                            console.log("data =====>", data);
                            dataResponse = data;
                            return callback(null, data)

                        }
                    })
                },

                function sendmail(callback) {
                    var payload = {
                        userEmail: dataResponse.email
                    }
                    const obj = generateToken.GenerateToken(payload);
                    const url = `${process.env.URL}/verifyEmail/${obj.token}`
                    sendMail.sendEMailFunction(url, dataResponse.email)
                    return callback(null, obj.token)
                }
            ]
            async.series(tasks, (err, data) => {
                if (err) {
                    return err;
                }
                else {
                    console.log(data);
                    return res.status(200).send(data)
                }
            })
        }
    } catch (err) {
        console.log("error in register controller", err)
    }
}

exports.login = (req, res) => {
    try {
        req.checkBody('email', 'email is not valid').isEmail();
        req.checkBody('password', 'password should be min 8 characters').isLength({ min: 8 });
        var errors = req.validationErrors();
        var response={}
        if(errors)
        {
            response.success = false;
            response.error= errors
            return res.status(422).send(response)
        }
        else {
            userService.login(req.body,(err,data) => {
                if(err)
                {
                    return res.status(500).send(err)

                }
                else{
                    var payload = {
                        "userId" : data[0]._id
                    }
                    var token = generateToken.GenerateToken(payload);
                    return res.status(200).send({"message" :data, "token" : token})
                }

            })
            
    }
}
    catch (err) {
        console.log("error in login controller", err);
    }


}

exports.login1 =(req,res) => {
    req.checkBody('email','email is not valid').isEmail();
    req.checkBody('password','pass should be min 8 characters').isLength({min:8});
    var errors = req.validationErrors();
    var response = {}
    if(errors) {
        response.success=false;
        response.error = errors
        res.status(422).send(response)
    }
    else{
        async.waterfall([
            function one(callback){
                userService.login(req.body,(err,result) => {
                    if(err){
                        callback(err)
                    }
                    else
                    {
                        callback(null,result)
                    }
                })
            },
            function two(result,callback){
                var token = generateToken.GenerateToken({"id": result[0]._id});
                callback(null,{result,"token" : token})
            }
        ],
        function(err,results) {
            if(err){
                return res.status(500).send(err);
            }
            else{
                console.log("login successful");  
                return res.status(200).send(results);
            }
        }
        )
    }
}
 
exports.forgotPassword = (req,res) => {
    try{
        req.checkBody("email","email is not valid").isEmail();
        var errors = req.validationErrors();
        var response = {};
        if(errors)
        {
            response.error = errors;
            response.success = false;
            return res.status(422).send(response);
        }
        else{
            userService.forgotPassword(req.body , (err,data)=> {
                console.log("asds",data);
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    console.log("asds",data);
                    
                    var payload={ "email":req.body.email}
                    var obj=generateToken.GenerateToken(payload)
                    var url = `${process.env.URL}/resetPassword?token=${obj.token}`
                    sendMail.sendEMailFunction(url,req.body.email)
                    return res.status(200).send(data);
                }
            })
        }
    }catch(err)
    {
        console.log("error in forgot password controller",err);
    }
}