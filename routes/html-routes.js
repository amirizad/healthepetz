var express = require("express");
var path = require("path");
var passport = require("passport");
var db = require("db");

var router = express.Router();
const auth = require('./../config/passport/passport.js')(passport,db);

router.get("/", (req,res) => {
    //res.send("hello, world");
        // Render home page
        res.sendFile(path.join(__dirname + "/filestack-example.html"));
    })
    .get("/owner", (req,res) => {
        res.send("hello, dashboard world");
        // Query db for owner data
        // Query db for all owner's pets
        // Render owner page
    })

    .get("/pet-records", (req,res) => {
        res.send("hello, pet-records world");
        // Query db for pet data
        // Render pet page
});

    //Get home route only if user is Authenticated using middleware
    router.get('/',auth(),(req,res,next)=>{
        res.render('index');
    });

    //Get login page and verify that...
    router.get('/login',(req,res,next)=>{
        //if the user is authenticated send them back to home
        if(req.isAuthenticated()){
            res.redirect('/');
        } else {
            //else render login page and if there is any flash msgs render them too
            res.render('login',{
                error:req.flash('error')
            });
        }
    });

    //Get register will render register
    router.get('/register',(req,res,next)=>{
        res.render('register');
    });

    //Get logout will simply logout the user using logout();
    router.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });

module.exports = router;

