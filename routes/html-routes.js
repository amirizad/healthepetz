module.exports = (express,passport,db,path)=>{

    //Declare router and auth variables
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);

    //use router
    router
    
    //get homepage render index
    .get('/',(req,res,next)=>{
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        } else {
            var errors = req.flash('error');
            res.render('index',{
                loginError: errors
            });
        }
    })

    //Get dashboard if user is authenticated
    .get('/dashboard',auth(),(req,res,next)=>{
        res.render('dashboard');
        // Query db for owner data
        // Query db for all owner's pets
        // Render owner page
    })

    .get('/petprofile',auth(),(req,res,next)=>{
        res.render('petprofile');
        // Query db for pet data
        // Render pet page
    })

    .get('/filestack',(req,res,next)=>{
        //res.send("hello, world");
        // Render home page
        res.sendFile(path.join(__dirname + "/filestack-example.html"));
    })
    
    .get('/table',(req,res,next)=>{
        res.render('table',{
            petId:2
        });
    })
    //returns the router requsted
    return router;
};

