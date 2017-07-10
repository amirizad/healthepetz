// NPM General Package Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require('express-handlebars');
const db = require('./models');
var methodOverride = require("method-override");

// Authentication Dependencies
// =============================================================
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

// Declare variables & local required files
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
const index = require('./routes/html-routes.js')(express,passport,db,path);
const API = require('./routes/api-routes.js')(express,passport,db,bcrypt);

//Used to create the sessions table for authentication
const sessionStore = new MySQLStore({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'healthepetz_db'
});

// START Configuring Express App
// ========================================================================================

// Sets up the Express app to handle data & cookie parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());
app.use(flash());
app.use(methodOverride("_method"));

// Sets up the Handlebars as default view engine with express
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Creates the sessions table that will authenticate user sessions
app.use(session({
    //random string that gets hashed to validate a real session and not a spoof
    secret: 'the intense secret code you will ever see',
    //saves a new session on every request if needed
    resave: false,
    //database location of saved sessions to avoid having to login everytime 
    //the server is restarted so that it is not stored locally
    store: sessionStore,
    //if the user is not logged in don't save a session or add a cookie
    saveUninitialized: false,
    //To be enabled if using HTTPS
    //   cookie: { secure: true }
}));

//Sets up passport with express
app.use(passport.initialize());
app.use(passport.session());
const localStrategy = require('./config/passport/passport-strategy.js')(passport,LocalStrategy,db,bcrypt);

//Servers public content such as CSS Javascript required in the HTML files
app.use(express.static(path.join(__dirname,'public')));

//Sets up express routes
app.use('/',index);
app.use('/api',API);

//Sets up express to handle 404 NOT FOUND
app.use((req, res)=> {
    res.status(404).send('404: Sorry the page you requested is not on this server.');
});

//Sets up express to handle 500 INTERNAL SERVER ERROR
app.use(function(error, req, res) {
    res.status(500).send('500: Internal Server Error');
});

//END CONFIGURE
//=================================================================================

// Sync Database and Start the Server
// =============================================================
db.sequelize.sync(false).then(()=>{
    app.listen(PORT,()=>{
        console.log('SERVER STARTED ON PORT ' + PORT);
    });
});