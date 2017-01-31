const config = require('./config.js')

//######################## Initialise server ###############################
const restify = require('restify');
const sessions = require('client-sessions');
const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0',
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(sessions({
    cookieName: 'session',
    secret: 'dfkslafjkdlsafjdksl;afjdkls;ajadfasklj',
    duration: 1000 * 60 * 60 // ms
}));

// ############## Authentication ########################
const passport = require('passport-restify');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
        console.log('google strategy call back')
        done(null, profile)
        //User.findOrCreate({ googleId: profile.id }, function (err, user){
            //return done(err, user);
        //});
}));

passport.serializeUser((user, done) => {
    logger.info('sererilise user')
    done(null, user);
});

passport.deserializeUser((user, done) => {
    logger.info('deserilise user')
    done(null, user);
});

server.use(passport.initialize());
server.use(passport.session());

const checkAuthenticated = (req, res, next) => {
    console.log('checkAuthenticated: entered')
    console.log(req._passport)
    if (req.isAuthenticated()) {
        console.log('authenticated')
        return next();
    }
    console.log('not authenticated')
    res.redirect('/fail', next);
};

//#### Authetnication endpoints
server.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'profile', 'email' ]
        })
    );

server.get('/auth/google/callback', checkAuthenticated, function (req, res, next) {
    req.redirect('/pass', next)
    });

server.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/auth/google', next);
    });




// ################################## User Pages ####################################
server.get('/pass', checkAuthenticated, restify.serveStatic({
    directory: './public/',
    file: 'pass.html'
}));
server.get('/fail', restify.serveStatic({
    directory: './public/',
    file: 'fail.html'
}));

// ##################### REST endpoints #################################

//######################### Run server ##############################
server.on('uncaughtException', (req, res, route, err) => {
    console.log('uncaughtException');
    console.log(err);
});

server.listen(8080, () => console.log(`${server.name} listening at ${server.url}`));

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
