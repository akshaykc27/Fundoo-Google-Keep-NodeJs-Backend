var express = require('express');
var app = express();
var router = express.Router();
var passportGoogle = require('../auth /google');
// const cors = require('cors');
// app.use(cors())

// app.options('*', cors());
// router.get('/login', (req, res) => {
//     console.log("in login api");
//     res.status(200).send('login successful');
// })

/* GOOGLE ROUTER */
router.get('/google',
    passportGoogle.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
    passportGoogle.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.send('callback works!!');
    });

module.exports = router;