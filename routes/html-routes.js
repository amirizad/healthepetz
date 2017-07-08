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

router.get('/',auth(),(req,res,next)=>{
        res.render('index');
    });

    router.get('/login',(req,res,next)=>{
        if(req.isAuthenticated()){
            res.redirect('/');
        } else {
            res.render('login',{
                error:req.flash('error')
            });
        }
    });

    router.get('/register',(req,res,next)=>{
        res.render('register');
    });

    router.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });

module.exports = router;