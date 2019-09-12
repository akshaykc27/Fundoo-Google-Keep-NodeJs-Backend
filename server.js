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
const elastic = require('./routes/elasticsearchRoutes');

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);
app.use('/elastic',elastic)
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