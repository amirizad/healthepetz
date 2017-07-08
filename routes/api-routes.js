module.exports = (express,passport,db,bcrypt)=>{
    var router = express.Router();

    router.post('/login',passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    }));

    router.post('/register',(req,res,next)=>{
        if(req.body.password === req.body.repassword){
            var saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
                db.Users.create({
                    "username": req.body.username,
                    "first_name": req.body.fname,
                    "last_name": req.body.lname,
                    "email": req.body.email,
                    "password": hash
                }).then((data)=>{
                    const user_id = data.dataValues.id;
                    req.login(user_id,(err)=>{
                        res.redirect('/');
                    });
                }).catch((err)=>{
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
            res.render('register',{
                error:[{"message": "Your passwords do not match. Try again."}]
            });
        }
    });
    return router;
};