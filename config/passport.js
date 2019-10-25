const mongoose = require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/user')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload.id})
            .then( user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch( err => {
                return done(err)
            })
    }));
}