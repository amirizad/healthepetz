module.exports = (passport,db)=>{
//Serialize the user if by id if avialble 
    passport.serializeUser((id, done) => {
        done(null, id);
    });
//Deserialize the user if id is found in cookie and is valid
    passport.deserializeUser(function(id, done) {
        db.Users.findById(id).then(function(user) {
                done(null, user.dataValues.id);
            }).catch(function(err) {
                if (err) {
                    throw err;
            }
        });
    });

//Middleware authentication function that verifies the user login
//helps prevent access to certain page
    function authenticationMiddleware () {  
        return (req, res, next) => {
            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    };
    
//Return the authentication function for use
    return authenticationMiddleware;
}