require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('./config/configMongo')
const router = require('./routes/route');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
app.use(cors());
app.options('*', cors());
var expressValidator = require('express-validator');
const swagger = require('swagger-ui-express');
swaggerDocument = require('./swagger/swagger.json');
var auth = require('./routes/auth');
var passportSetup = require('./auth /google');

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "*", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(session({
//   secret: 's3cr3t',
//   resave: true,
//   saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use('/api', swagger.serve, swagger.setup(swaggerDocument));

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`server is listening to ${process.env.PORT}`);
})