const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
  clientID: '664195880445424',
  clientSecret: 'f26196934c94c24de3c9c836d014faa3',
  callbackURL: 'localhost:3000'
},
  function (accessToken, refreshToken, profile, done) {
    console.log('response', accessToken, refreshToken, profile)
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // })
  }
))

module.exports = passport
