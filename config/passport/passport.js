module.exports = (passport,db)=>{

    passport.serializeUser((id, done) => {
        // console.log(id)
        done(null, id);
    });

    passport.deserializeUser(function(id, done) {
        db.Users.findById(id).then(function(user) {
            // console.log('deserializing user:',user);
                done(null, user.dataValues.id);
            }).catch(function(err) {
                if (err) {
                    throw err;
            }
        });
    });

    function authenticationMiddleware () {  
        return (req, res, next) => {
            // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    };

    return authenticationMiddleware;
}