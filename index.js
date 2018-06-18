const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // must define the schema first before using in passport.js file
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // get body of request middleware for expressjs if not no body is passed on post request
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will server up production assets
  // Like our main.js file, or main.css file
  app.use(express.static('client/build')); //specific file
  // Express will sere up the index.html file
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); //leave to reactroutea
  });
}

const PORT = process.env.PORT || 5000; //heroku
app.listen(PORT);
