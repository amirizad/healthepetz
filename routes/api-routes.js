module.exports = (express,passport,db,bcrypt)=>{

    //Declare router variable 
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);
    

    router.route('/login')
        .post(passport.authenticate('local',{
            //if valid redirect to home
            successRedirect:'/',
            //if not redirect back to login and pass in flash errors
            failureRedirect:'/login',
            failureFlash:true
        }));

    //Post route for register
    router.route('/register')
        .post((req,res,next)=>{
            //if the userpassword matches continue
            if(req.body.password === req.body.repassword){
                //Declare number of salt rounds default:10
                const saltRounds = 10;
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
                        var user_id = data.dataValues.id;
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

    router.route("/owner")
        .get(auth(), (req, res, next) => {
            db.owners.findOne({
                where: {userId: req.user,
            }}).then(function(results) {
                res.json(results);
            }); 
        })
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
    
    router.route("/pet/:petId?")
        .get(auth(),(req, res, next) => {
                //console.log(req.query);
             if (req.params.petId) {
        
                db.owners.findAll({
                   where: {userId: req.user},
                   include: {model: db.pets, required: true,
                             where: {id: req.params.petId}
                }}).then(function(results) {
                    if (!results===[]) {
                        res.json(results);
                    }
                    else {
                        res.send("No pets found!");
                    }
                }); 
            }
            else {
                 db.owners.findAll({
                   where: {userId: req.user},
                   include: {model: db.pets, required: true}
                 }).then(function(results) {
                        res.json(results);
                }); 
            }
        })
        .post((req, res) => {
            // Create owner
            // Create pet
                // Owner id must be included
        });
    

    router.route("/med-history/:petId?")
        .get(auth(),(req, res, next) => {
                //console.log(req.query);
             if (req.params.petId) {
        
                db.owners.findAll({
                   where: {userId: req.user},
                   include: {model: db.pets, required: true,
                             where: {id: req.params.petId},
                             include: {model: db.medical_history, required: true}
                }}).then(function(results) {

                        res.json(results);
                }); 
            }
            else {
                 db.owners.findAll({
                   where: {userId: req.user},
                   include: {model: db.pets, required: true,
                   include: {model: db.medical_history, required: true}}
                 }).then(function(results) {
                        
                        res.json(results);
                }); 
            }
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

     router.route("/vaccinations/:petId?")
        .get(auth(),(req, res, next) => {
                //console.log(req.query);
             if (req.params.petId) {
        
                db.owners.findAll({
                   where: {userId: req.user},
                   include: {model: db.pets, required: true,
                             where: {id: req.params.petId},
                             include: {model: db.vaccinations, required: true}
                }}).then(function(results) {

                        res.json(results);
                }); 
            }
            else {
                 db.owners.findAll({
                   where: {userId: req.user},
                   include: {model: db.pets, required: true,
                   include: {model: db.vaccinations, required: true}}
                 }).then(function(results) {
                        
                        res.json(results);
                }); 
            }
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
        
    //returns router back to request
    return router;
};

