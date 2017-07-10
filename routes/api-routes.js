module.exports = (express,passport,db,bcrypt)=>{

    //Declare router variable 
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);
    

    router.route('/login')
        .post(passport.authenticate('local',{
            //if valid redirect to home
            successRedirect:'/dashboard',
            //if not redirect back to login and pass in flash errors
            failureRedirect:'/',
            failureFlash:true
        }));

    //Get logout will simply logout the user using logout();
    router.route('/logout')
        .get((req,res)=>{
            req.logout();
            res.redirect('/');
        });

    //Post route for register
    router.route('/register')
        .post((req,res,next)=>{
            var user = req.body;
            console.log(user);
            //if the userpassword matches continue
            if(user.password === user.repassword){
                //Declare number of salt rounds default:10
                const saltRounds = 10;
                //Hash the normal password for protected and pass it as hash
                bcrypt.hash(user.password, saltRounds, (err, hash) =>{
                    //Query the Users table and pass in the required fields including the hash pw
                    db.Users.create({
                        "username": user.username,
                        "email": user.email,
                        "password": hash
                    }).then((data)=>{
                        //When done grab the new user id and store it in a variable
                        var userID = data.dataValues.id;
                        //create the user in owners table
                        db.owners.create({
                            "owner_fname": user.fname,
                            "owner_lname": user.lname,
                            "owner_dob": user.dob,
                            "owner_sex": user.sex,
                            "address": user.address,
                            "city": user.city,
                            "state": user.state,
                            "zip": user.zip,
                            "phone": user.phone,
                            "fax": user.fax,
                            "UserId": userID
                        }).then((result)=>{
                            //login the user with the id and redirect to dashboard
                            req.login(userID,(err)=>{
                                res.redirect('/dashboard');
                            });
                        }).catch((err)=>{
                            console.log(err);
                            //if there is any errors render register and pass in the error flash msgs
                            res.render('index',{
                                username: req.body.username,
                                fname: req.body.fname,
                                lname: req.body.lname,
                                email: req.body.email,
                                dob: req.body.dob,
                                phone: req.body.phone,
                                fax: req.body.fax,
                                address: req.body.address,
                                city: req.body.city,
                                zip: req.body.zip,
                                error:err.errors
                            });
                        })
                    }).catch((err)=>{
                        console.log(err);
                        //if there is any errors render register and pass in the error flash msgs
                        res.render('index',{
                            username: req.body.username,
                            fname: req.body.fname,
                            lname: req.body.lname,
                            email: req.body.email,
                            dob: req.body.dob,
                            phone: req.body.phone,
                            fax: req.body.fax,
                            address: req.body.address,
                            city: req.body.city,
                            zip: req.body.zip,
                            error:err.errors
                        });
                    });
                });
            } else {
                //else render register page again with filled values and flash msg
                res.render('index',{
                    username: req.body.username,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    dob: req.body.dob,
                    phone: req.body.phone,
                    fax: req.body.fax,
                    address: req.body.address,
                    city: req.body.city,
                    zip: req.body.zip,
                    error:[{"message": "Your passwords do not match. Try again."}]
                });
            }
        });

    router.route("/owner")
        .get(auth(), (req, res, next) => {
            db.owners.findOne({
                where: {userId: req.id,
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
    
    router.route("/pet/:pet-id?")
        .get(auth(), (req, res, next) => {
            db.owners.findOne({
                where: {userId: req.id,
                        petId: req.petId,
                include: [db.pets]
            }}).then(function(results) {
                res.json(results);
            }); 
        })
        .post((req, res) => {
            // Create owner
            // Create pet
                // Owner id must be included
        });
    

    router.route("/med-bill/:pet-id?")
        .get(auth(), (req, res, next) => {
            db.owners.findOne({
                where: {userId: req.id,
                        petId: req.petId,
            include: [db.pets, db.medical_history]
            }}).then(function(results) {
                res.json(results);
            }); 
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

