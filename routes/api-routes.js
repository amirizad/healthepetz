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
            if(user.password === user.confirmpass){
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
                            "phone": user.phone,
                            "fax": user.fax,
                            "address": user.address,
                            "city": user.city,
                            "state": user.state,
                            "zip": user.zip,
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
                                regError:err.errors
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
                            regError:err.errors
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
                    regError:[{"message": "Your passwords do not match. Try again."}]
                });
            }
        });

    router.route("/owner/:ownerId?")
        .get(auth(), (req, res, next) => {
            db.owners.findOne({
                where: {userId: req.user},
            }).then(function(results) {
                res.json(results);
            }); 
        })
       .post(auth(),(req, res, next) => {
            // Create owner
            // Redirect to /owner
            db.owners.create({
                userId: req.body.userId,
                owner_fname: req.body.owner_fname,
                owner_lname: req.body.owner_lname,
                owner_dob: req.body.owner_dob, 
                owner_sex: req.body.owner_sex,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                fax: req.body.fax
            }).then((results) => {
                res.json(results)
            });
        })
        .put(auth(),(req, res, next) => {
        // Update owner
            db.owners.update(req.body, 
            { 
                fields: Object.keys(req.body), 
                where: {id: req.body.id} 
            })
            .then((results) => {
                res.json(results)
            }).catch(function(error) {
                console.log(error);
            });
        })
        .delete(auth(),(req, res, next) => {

            db.owners.findOne({
                attributes: ['id'],
                where: {userId: parseInt(req.user)},
            }).then((results) => {
                 var tempOwnerId=results.id
                 
                 var tempSQL = db.sequelize.dialect.QueryGenerator.selectQuery('pets',
                        {attribute: ['id'], where: {ownerId: results.id}}).slice(0,-1); // to remove the ';' from the end of the SQL
               
                tempSQL=tempSQL.replace('*','id')
                
                db.medical_history.destroy({
                    where: {petId: {$in: db.sequelize.literal('(' + tempSQL + ')')}}
            }).then((results) => {
                db.vaccinations.destroy({
                    where: {petId: {$in: db.sequelize.literal('(' + tempSQL + ')')}}
            }).then((results) => {
                db.pets.destroy({
                    where: {ownerId: tempOwnerId}
            }).then((results) => {
                db.owners.destroy({
                    where: {id: tempOwnerId}
            }).then((results) => {
                    res.json(results);
            })});})});});});

    
    router.route("/pet/:petId?")
        .get(auth(),(req, res, next) => {
             if (req.params.petId) {
          
                db.owners.findAll({
                    attributes: ['userId'],
                   where: {userId: parseInt(req.user)},
                   include: {model: db.pets, required: true,
                             where: {id: parseInt(req.params.petId)},
                             order: [[{model: db.pets}, 'pet_type'],[{model: db.pets}, 'pet_name']]
                }}).then(function(results) {
                    console.log(results.length);
                    if (results.length===0) {
                        res.json(results);
                    }
                    else {
                        res.json(results[0].pets);
                    }    
                }); 
            }
            else {
                 db.owners.findAll({
                    attributes: ['userId'],
                   where: {userId: parseInt(req.user)},
                   include: {model: db.pets, required: true,
                   order: [[{model: db.pets}, 'pet_type'],[{model: db.pets},'pet_name']]
                 }}).then(function(results) {
                     if (results.length===0) {
                        res.json(results);
                    }
                    else {
                        res.json(results[0].pets);
                    }    
                    
                }); 
            }
        })
        .post(auth(),(req, res, next) => {
            // Create pet
            db.pets.create({
                ownerId: req.body.ownerId,
                pet_name: req.body.pet_name,
                pet_type: req.body.pet_type,
                pet_breed: req.body.pet_breed,
                pet_color: req.body.pet_color,
                license_no: req.body.license_no,
                microchip_no: req.body.microchip_no,
                insur_name: req.body.insur_name,
                insur_id: req.body.insur_id,
                insur_phone: req.body.insur_phone,
                pet_dob: req.body.pet_dob,
                pet_dod: req.body.pet_dod,
                pet_age: req.body.pet_age,
                pet_sex: req.body.pet_sex,
                spayed_neutered_ind: req.body.spayed_neutered_ind,
                pet_image_url: req.body.pet_image_url,
                cond1: req.body.cond1,
                cond2: req.body.cond2,
                cond3: req.body.cond3,
                med1: req.body.med1,
                med2: req.body.med2,
                med3: req.body.med3,
                vet1_name: req.body.vet1_name,
                vet1_specialty: req.body.vet1_specialty,
                vet1_address: req.body.address,
                vet1_city: req.body.vet1_city,
                vet1_state: req.body.vet1_state,
                vet1_zip: req.body.vet1_zip,
                vet1_phone: req.body.vet1_phone,
                vet1_email: req.body.vet1_email,
                vet1_fax: req.body.fax,
                vet2_name: req.body.vet2_name,
                vet2_specialty: req.body.vet2_specialty,
                vet2_address: req.body.vet2_address,
                vet2_city: req.body.vet2_city,
                vet2_state: req.body.vet2_state,
                vet2_zip: req.body.zip,
                vet2_phone: req.body.vet2_phone,
                vet2_email: req.body.vet2_email,
                vet2_fax: req.body.vet2_fax
            }).then((results) => {
                res.json(results);
            });
        })
        
        .put((req, res) => {
            db.pet.update(req.body, 
            { 
                fields: Object.keys(req.body), 
                where: {id: req.body.id} 
            })
            .then((results) => {
                res.json(results)
            }).catch(function(error) {
                console.log(error);
            });
        })
        .delete(auth(),(req, res,next) => {
            db.vaccinations.destroy({
                where: {petId: parseInt(req.params.petId)}
            }).then((results) => {
                db.medical_history.destroy({
                where: {petId: parseInt(req.params.petId)}
            }).then((results) => {
                    db.pets.destroy({
                    where: {id: parseInt(req.params.petId)}
                    }).then((results) => {
                    res.json(results);
                    });
                });
            })});    
    

    router.route("/med-history/:petId?")
        .get(auth(),(req, res, next) => {
             if (req.params.petId) {

                db.owners.findAll({
                    attributes: ['userId'],
                    where: {userId: parseInt(req.user)},
                    include: {model: db.pets, required: true,
                                attributes: [['id','petId']],
                                where: {id: parseInt(req.params.petId)},
                                order: [[{model: db.pets}, 'ownerId']],
                                include: {model: db.medical_history, required: true},
                                order: [[{model: db.medical_history}, 'petId', 'ASC' ],[{model: db.medical_history}, 'svc_dt', 'DESC' ],[{model: db.medical_history}, 'prov_name', 'ASC' ]]
                    }}).then(function(results) {
                        if (results.length===0  || results[0].length===0) {
                            res.json(results);
                        }
                        else {
                            res.json(results[0].pets[0].medical_histories);
                        }
                    }); 
                }
            else {
                 db.owners.findAll({
                   attributes: ['userId'],
                   where: {userId: parseInt(req.user)},
                   include: {model: db.pets, required: true,
                            attributes: [['id','petId']],
                            order: [[{model: db.pets}, 'ownerId']],
                            include: {model: db.medical_history, required: true},
                            order: [[{model: db.medical_history}, 'petId', 'ASC' ],[{model: db.medical_history}, 'svc_dt', 'DESC' ],[{model: db.medical_history}, 'prov_name', 'ASC' ]]
                    }}).then(function(results) {
                        if (results.length===0) {
                               res.json(results);
                        }
                        else {
                        res.json(results[0].pets);
                        }
                }); 
            }
        })
        .post(auth(),(req, res, next) => {
              db.medical_history.create({
                petId: req.body.petId,
                prov_name: req.body.prov_name,
                cond1: req.body.cond1,
                svc_dt: req.body.svc_dt,
                total_billed_amt: req.body.total_billed_amt,
                total_paid_amt: req.body.total_paid_amt,
                notes: req.body.notes,
                doc_type: req.body.doc_type,
                doc_image_url: req.body.doc_image_url
            });
        })
        .put((req, res) => {
            // Update med bill
            db.medical_history.update(req.body, 
                { 
                    fields: Object.keys(req.body), 
                    where: {id: req.body.id} 
                })
            .then((results) => {
                res.json(results)
            }).catch(function(error) {
                console.log(error);
            });
        })
        .delete(auth(),(req, res,next) => {
             db.medical_history.destroy({
                where: {id: parseInt(req.params.petId)}
            }).then((results) => {
                res.json(results);
            });
        });
   
    router.route("/vaccinations/:petId?")
        .get(auth(),(req, res, next) => {
             if (req.params.petId) {
        
                db.owners.findAll({
                   attributes: ['userId'],
                   where: {userId: parseInt(req.user)},
                   include: {model: db.pets, required: true,
                             where: {id: parseInt(req.params.petId)},
                             attributes: [['id','petId']],
                             include: {model: db.vaccinations, required: true,
                             order: [[{model: db.vaccinations}, 'petId', 'ASC' ],[{model: db.vaccinations}, 'last_vacc_dt', 'DESC' ],[{model: db.vaccinations}, 'vacc_name', 'ASC' ]]}
                }}).then(function(results) {
                        if(results.length===0 || results[0].pets[0].length===0) {
                            res.json(results);
                        }
                        else {
                         res.json(results[0].pets[0].vaccinations);
                        }
                }); 
            }
            else {
                 db.owners.findAll({
                   attributes: ['userId'],
                   where: {userId: parseInt(req.user)},
                   include: {model: db.pets, required: true,
                   attributes: [['id','petId']],
                   include: {model: db.vaccinations, required: true,
                   order: [[{model: db.vaccinations}, 'petId', 'ASC' ],[{model: db.vaccinations}, 'last_vacc_dt', 'DESC' ],[{model: db.vaccinations}, 'vacc_name', 'ASC' ]]}
                 }}).then(function(results) {
                        if (results.length===0 ||  results[0].pets.length===0) {
                            res.json(results);
                        }
                        else {
                            res.json(results[0].pets);
                        }
                }); 
            }
        })
        .post(auth(),(req, res, next) => {
            // Create vaccination
            db.vaccinations.create({
                petsId: req.body.petId,
                vacc_name: req.body.vacc_name,
                last_vacc_dt: req.body.last_vacc_dt,
                next_vacc_dt: req.body.next_vacc_dt,
                vacc_image_url: req.body.vacc_image_url
            }).then((results) => {
                res.json(results);
            });
        })
        .put((req, res) => {
            // Update med bill
            db.vaccinations.update(req.body, 
                { 
                    fields: Object.keys(req.body), 
                    where: {id: req.body.id} 
                })
            .then((results) => {
                res.json(results)
            }).catch(function(error) {
                console.log(error);
            });
        })
        .delete(auth(),(req, res, next) => {
            db.vaccinations.destroy({
                where: {id: parseInt(req.params.petId)}
            }).then((results) => {
                res.json(results);
            });
            // Delete vaccination
        });
        
    //returns router back to request
    return router;
};
