module.exports = (passport,LocalStrategy,db,bcrypt)=>{
    //Set up passport to use local strategy to login a user
    passport.use(new LocalStrategy((username, password, done) =>{
        //Looks for the username first and grabs the id and password if it matches
        db.Users.findOne({
            attributes:['id','password'],
            where:{
                "username":username
            }
        }).then((results)=>{
            if(results){
                //if there is a match store the has from the db and user id returned
                var hash = results.dataValues.password;
                var userid = results.dataValues.id;
                //Compare the user inputted password hashed to the db hashed pw
                bcrypt.compare(password,hash,(err,res)=>{
                    //if it matches login the user and pass the id to the auth
                    if (res === true){
                        return done(null,userid);
                    } else {
                    //if it doesn't pass in flash and send a flash error message
                        return done(null,false,{message:'Sorry. The password is incorrect. Please try again.'});
                    }
                });
            } else {
                //if no returns return false and send flsah error message
                return done(null,false,{message:'The username you provided was not found.'});
            }
        }).catch((err)=>{
            //any other errors return them
            done(err);
        });
    }));
}
