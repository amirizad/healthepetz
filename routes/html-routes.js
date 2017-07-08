module.exports = (express,passport,db)=>{
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);

    router.get('/',auth(),(req,res,next)=>{
        console.log(req.isAuthenticated());
        console.log(req.user);
        res.render('index');
    });

    router.get('/login',(req,res,next)=>{
        if(req.isAuthenticated()){
            res.redirect('/');
        } else {
            console.log(req.user);
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

    return router;
};