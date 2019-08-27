const jwt = require('jsonwebtoken');
module.exports = {
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, process.env.SECRETKEY, { expiresIn: '1h' }) //expires in two hours
        const obj = {
            success: true,
            message: 'Token Generated !!',
            token: token
        }
        return obj;
    }
}                                                   