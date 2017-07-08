module.exports = (express,passport,db,bcrypt)=>{
    //Declare router variable 
    var router = express.Router();
    //Post route for login using authentication middleware with local strategy
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

    //returns router back to request
    return router;
};