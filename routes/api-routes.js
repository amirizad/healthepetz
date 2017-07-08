var express = require("express");
var passport = require("passport");
var db = require("db");
var bcrypt = require("bcrypt");

var router = express.Router();

router.route("/owner")
    .post((req, res) => {
        res.send("hello, world");
        // Create owner
        // Redirect to /owner
    })
    .put((req, res) => {
    // Update owner
    // Redirect to /owner
    })
    .delete((req, res) => {
    // Delete owner
            // Delete all owner's pets
    // Redirect to "/"
    });

router.route("/pet/:owner-id?/:pet-id?")
    .get((req, res) => {
        // Must be logged in to access
        // Return data matching owner ID and pet ID.
        // Return all pet data for owner if no pet ID specified
    })
    .post((req, res) => {
        // Create owner
        // Create pet
            // Owner id must be included
    });

router.route("/vaccination/:pet-id?")
    .get((req, res) => {
        // Return data for vaccination schedule
    })
    .post((req, res) => {
        // Create pet vaccination record and schedule
    })
    .put((req, res) => {
        // Update pet vaccination record and schedule 
    })
    .delete((req, res) => {
        // Delete pet vaccination record and schedule
    });

router.route("/med-bill/:owner-id/:pet-id?")
    .get((req, res) => {
        // Retreive med bill
    })
    .post((req, res) => {
        // Create med bill
    })
    .put((req, res) => {
        // Update med bill
    })
    .delete((req, res) => {
        // delete med bill
  });

    router.post('/login',passport.authenticate('local',{
        //if valid redirect to home
        successRedirect:'/',
        //if not redirect back to login and pass in flash errors
        failureRedirect:'/login',
        failureFlash:true
    }));
    //Post route for register
    router.post('/register',(req,res,next)=>{
        //if the userpassword matches continue
        if(req.body.password === req.body.repassword){
            //Declare number of salt rounds default:10
            var saltRounds = 10;
            //Hash the normal password for protected and pass it as hash
            bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
                //Query the Users table and pass in the required fields including the hash pw
                db.Users.create({
                    "username": req.body.username,
                    "first_name": req.body.fname,
                    "last_name": req.body.lname,
                    "email": req.body.email,
                    "password": hash
                }).then((data)=>{
                    //When done grab the new user id and store it in a variable
                    const user_id = data.dataValues.id;
                    //login the user with the id and redirect to home page
                    req.login(user_id,(err)=>{
                        res.redirect('/');
                    });
                }).catch((err)=>{
                    //if there is any errors render register and pass in the error flash msgs
                    res.render('register',{
                        username: req.body.username,
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        error:err.errors
                    });
                });
            });
        } else {
            //else render register page again with filled values and flash msg
            res.render('register',{
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                error:[{"message": "Your passwords do not match. Try again."}]
            });
        }
    });

module.exports = router;

