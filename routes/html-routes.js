module.exports = (express,passport,db,path)=>{

    //Declare router and auth variables
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);

    //use router
    router
    
    //get homepage render index
    .get('/',(req,res,next)=>{
        if(req.isAuthenticated()){
            res.render('index',{
                loggedIn:1,
                petId:2
            });
        } else {
            var errors = req.flash('error');
            res.render('index',{
                loggedIn:0,
                loginError: errors
            });
        }
    })

    .get('/filestack',(req,res,next)=>{
        //res.send("hello, world");
        // Render home page
        res.sendFile(path.join(__dirname + "/filestack-example.html"));
    })
    //returns the router requsted
    return router;
};

