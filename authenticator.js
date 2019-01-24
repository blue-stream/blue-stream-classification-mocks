const passport = require("passport");
const passportJwt = require("passport-jwt");
class Authenticator {
    static initialize(verifyCallback) {
        const strategy = new passportJwt.Strategy(Authenticator.jwtOptions, function (jwtPayload, next) {
            if (verifyCallback) {
                verifyCallback(jwtPayload, next);
            }
            else {
                next(null, jwtPayload);
            }
        });
        passport.use(strategy);
        return passport.initialize();
    }
    static middleware(req, res, next) {
        passport.authenticate('jwt', { session: false })(req, res, next);
    }
}
Authenticator.jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'bLue5tream@classiFiCaToR',
};
exports.Authenticator = Authenticator;