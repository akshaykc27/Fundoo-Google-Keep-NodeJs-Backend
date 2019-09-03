var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../model/usermodel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("profile detailsin google.js ",profile);
      
      const userData = new User({
        firstname : profile.displayName,
        lastname : profile.displayName,
        password  : profile.id
      })
       userData.save(userData, function (err, user) {
         console.log("user saved successfully ");
         
         return done(err, user);
       });
  }
));

module.exports = passport;