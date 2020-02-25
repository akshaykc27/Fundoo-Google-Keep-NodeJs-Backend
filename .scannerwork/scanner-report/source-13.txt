var user = require('../model/usermodel')
var bcrypt = require('bcryptjs');

function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
/**
 *@description:To store new user data and check it is an existed user or not 
 */
exports.register = (req, callback) => {
    try {
        user.find({ 'email': req.email }, (err, data) => {
            if (err) {
                console.log("Error in register user schema ");
                return callback(err);
            } else if (data.length > 0) {
                var response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
                return callback(response);
            } else {
                const newUser = new user({
                    "firstname": req.firstname,
                    "lastname": req.lastname,
                    "email": req.email,
                    "password": hash(req.password),
                    "verifyemail": false
                });
                newUser.save((err, result) => { //save the user in database
                    if (err) {
                        console.log("error in model file", err);
                        return callback(err);
                    } else {
                        console.log(req.firstname);
                        // console.log("data save successfully", result);
                        //console.log("registered successfully");
                        callback(null, result);
                        //console.log("no return statements ..registered successfully");
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.login = (req, callback) => {
    try {
        var obj = {};
        user.find({ email: req.email }, (err, data) => {
            if (err) {
                return callback(err)
            }
            else if (data.length > 0) {
                bcrypt.compare(req.password, data[0].password, (err, res) => {
                    if (err) {
                        return callback(err)
                    } else if (res) {
                        obj = data;
                        return callback(null, obj)
                    }
                    else {
                        console.log("incorrect password");
                        return callback("incorrect password").status(500);
                    }
                });
            } else {
                return callback("invalid user")
            }
        })
    } catch (err) {
        console.log("error in login service", err)
    }

}

exports.forgotPassword = (req, callback) => {
    try {
        user.find({ "email": req.email }, (err, data) => {
            if (err) {
                return callback(err)
            } else if (data.length > 0) {
                // console.log("data",data);
                return callback(null, data);
            }
            else {
                return callback("user doesn't exist").status(404)
            }
        })
    } catch (err) {
        console.log("error in forgot password service ", err);
    }
}

exports.resetPassword = body => new Promise((resolve, reject) => {
    console.log("body in reset password",body);
    
    const encryptedPassword = hash(body.password);
    console.log(encryptedPassword);
    user.findOneAndUpdate({ email : body.email }, {
        $set: { password: encryptedPassword }
    }).then(data => resolve(data)
    ).catch(error => {
        console.log("error", error);
        reject(error);
    }
    )
})

exports.setProfilePic = (req, callback) => {
    try {
        console.log("req in services", req.file.location);

        user.findOneAndUpdate({ _id : req.decoded.payload.userId }, { $set: { imageURL: req.file.location } }, (err, data) => {
            if (err) {
                return callback(err)
            }
            else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error in set prof service", err);
    }
}