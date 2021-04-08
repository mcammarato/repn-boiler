const LocalStrategy = require('passport-local').Strategy;
const db = require('../../knexfile');
const bcrypt = require('bcrypt');

function initialize(passport) {
  console.log('initalized');

const authenciateUser = (username, password, done) => {

  db('public.users')
  .where({ username: username })
  .then((rows) => {
    if (rows.length > 0) {

      const user = rows[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }

        if (isMatch) {
          return done(null, user)
        }
        else {
          return done(null, false, {message: 'password is not correct'});
        }
      });
    }
    else {
      return done(null, false, {
        message: 'username is not registered'
      });
    }
  });

}
  passport.use(
    new LocalStrategy(
      { usernameField: 'username', passwordField: 'password' },
      authenciateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    db('public.users')
    .where({ id: id })
    .then((rows) => {
      if (rows.length > 0) {
        return done(null, rows[0]);
      }
    });
  })
}

module.exports = initialize;