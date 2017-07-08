module.exports = (express,passport,db)=>{
    
    //Declare router and auth variables
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);

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

    //returns the router requsted
    return router;
};