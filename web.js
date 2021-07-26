require('dotenv').config();
const express = require('express');
const app = express();
const hotwire = require('express-hotwire').default;
const path = require('path');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const TwitchStrategy = require("passport-twitch.js").Strategy;
const sessionSecret = process.env.SESSION_SECRET;
const MongoStore = require('connect-mongo');
const UserModel = require('./models/user.model');
const mongoose = require('mongoose');
const { tankSocketHandler } = require('./ws/tank.ws');
const favicon = require('serve-favicon');

if (typeof process.env.DB_CONNECTION_URL === 'undefined') throw new Error('DB_CONNECTION_URL required in env, but it was undefined.')
if (typeof sessionSecret === 'undefined') throw new Error('SESSION_SECRET required in env, but it was undefined.')

mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false, useCreateIndex: true }, function (err) {
  if (err) {
    console.log(`Could not connect to mongodb on ${process.env.DB_CONNECTION_URL}. Ensure that you have mongodb running on ${process.env.DB_CONNECTION_URL} and mongodb accepts connections on the ports!`);
    console.log(`\n\n\n\n❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ DATABASE NOT CONNECTED ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ \n\n\n\n`)
  } else {
    console.log(`\n\n\n\n👍 👍 👍 👍 👍 👍 👍 👍 DATABASE CONNECTED 👍 👍 👍 👍 👍 👍 👍 👍\n\n\n\n`)
    console.log('mongo-express: http://localhost:8081/ \nwebsite: http://localhost:7070/')
  }
});


const staticDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src');
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret,
  store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_URL })
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(hotwire());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'src', 'img', 'favicon.ico')));

app.use('/', express.static(staticDir));
app.use('/img', express.static(path.join(srcDir, 'img')));
app.use('/atlas', express.static(path.join(srcDir, 'atlas')));
app.get("/auth/twitch", passport.authenticate("twitch.js"));
app.get("/auth/twitch/callback", passport.authenticate("twitch.js", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});

passport.use(
  new TwitchStrategy({
  	clientID: process.env.TWITCH_API_CLIENT_ID,
  	clientSecret: process.env.TWITCH_API_CLIENT_SECRET,
  	callbackURL: 'http://localhost:7070/auth/twitch/callback',
  	scope: 'user_read'
  },
  function(accessToken, refreshToken, profile, done) {
  	// db query
    console.log('twitch auth')
    console.log(profile)
  	const user = new UserModel({
      id: profile.id,
      login: profile.login,
      displayName: profile.display_name,
      profileImageUrl: profile.profile_image_url,
      email: profile.email
    })
    user.save({}, done);
  })
);


passport.serializeUser((user, cb) => {
  console.log(`serializeUser ${user.id}`);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log(`deserializeUser ${id}`);
  UserModel.findOne({ id }, cb);
});


// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

tankSocketHandler(io);



httpServer.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
})