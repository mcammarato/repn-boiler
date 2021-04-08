const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const apiRoute = require('./routes/api');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../../knexfile');
const passport = require('passport');
const initializePassport = require('./passportConfig');

initializePassport(passport);

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: null 
});

app.use(expressSession);
app.use(passport.initialize())
app.use(passport.session())

app.set('views', 'src/client/js/components/container');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:6300');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Register a new user
app.post('/api/register', checkAuthenticated, (req, res, next) => {
  let { username, password } = req.body;
  let errors = [];

  if (!username || !password) {
    errors.push({
      message: "Please enter all fields"
    })
  }

  if (password.length <= 1) {
    errors.push({
      message: "Password should be more than one character"
    })
  }

  // Validate form
  if (errors.length > 0) {
    let e = JSON.stringify(errors);
    res.send(e);
  }

  // If no validation errors
  // check to make sure user doesn't already exist
  else {
  db.select('username')
  .from('public.users')
  .where('username', username)
  .then(usernames => {
    // if new user, insert into db
    if (usernames.length === 0) {
      return db('users')
      .returning('id')
      .insert([{
        username: req.body.username,
        password: bcrypt.hashSync(password, 10)
      }])
      .then((newUserId) => {
          console.log('isnserted user', newUserId);
      });
    }
    // if user already exists, send error
    errors.push({
      message: "user already exists"
    })
    let e = JSON.stringify(errors);
    res.send(e);
    return;
  })
  }
});


app.post('/api/login',
passport.authenticate('local', { 
  failureRedirect: '/login', 
  successRedirect: '/dashboard' }), 
(err, req, res, next) => {
  if (err) next(err);
});

// Authenticate dashboard
app.get('/dashboard', checkNotAuthenticated, (req, res, next) => {
  next();
});

// Send Dashboard Data
app.get('/api/dashdata', (req, res, next) => {
  if (req.user) {
    res.json({ username: req.user.username });
  }
  else {
    res.json({ message: 'Please log in'});
  }
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.get('/test', (req, res) => {
  res.json({ test: 'testing' });
});

// HTTP Logs
app.use(morgan('short'));

// Adventure Works API
app.use('/api', apiRoute);

// Serve static react app for prod
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// Parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP Logs
app.use(morgan('short'));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.send(err.stack);
  res.status(500).send('Something broke!')
})

// Server
app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`)) // eslist-disable-line
