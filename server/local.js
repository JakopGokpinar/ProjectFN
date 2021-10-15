const LocalStrategy = require('passport-local');
const passport = require('passport');
const UserModel = require('./models/UserModel.js');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: "email" },
    async (email, password, done) => {
        UserModel.findOne({ email: email})
            .then(user => {
                if (!user) {
                    console.log('user not found')
                    done(null,false, {message: 'incorrect email'});
                    return;
                } else {
                    if (user.password !== password) {
                        console.log('passwords dont match')
                        return done(null, false, { message: 'incorrect password'})
                    }
                    console.log(user)
                    return done(null, user, {message: 'user found'})
                }               
            })
            .catch(err => {
                return console.log(err)
            })
    }
))