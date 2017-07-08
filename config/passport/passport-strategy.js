module.exports = (passport,LocalStrategy,db,bcrypt)=>{
    passport.use(new LocalStrategy((username, password, done) =>{
        db.Users.findOne({
            attributes:['id','password'],
            where:{
                "username":username
            }
        }).then((results)=>{
            if(results){
                var hash = results.dataValues.password;
                var userid = results.dataValues.id;
                bcrypt.compare(password,hash,(err,res)=>{
                    if (res === true){
                        return done(null,userid);
                    } else {
                        return done(null,false,{message:'Sorry. The password is incorrect. Please try again.'});
                    }
                });
            } else {
                return done(null,false,{message:'The username you provided was not found.'});
            }
        }).catch((err)=>{
            done(err);
        });
    }));
}
