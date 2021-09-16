var passport = require('passport')
var express = require('express')
var Strategy = require('passport-google-oauth20')

const app =  express()

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, callback) {
    callback(null, user)
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj)
})

passport.use(
    new Strategy({
        clientID: '950546899246-idtcngdk35b40v6oeqhcnn38f5nmsvv8.apps.googleusercontent.com',
        clientSecret: 'C94SZH4oon7xQbuQpoeg2DvE',
        callbackURL: 'http://localhost:5000/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        done(null, { })
    })
)

app.get('/', (req, res) => {
    res.render('googleauth.ejs')
})


app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }),
(req, res, next) => {
    console.log(req.user, req.isAuthenticated());
    //res.send("user logged in!")
    res.render('index.ejs')
});

app.get("/auth/fail", (req, res, next) => {
    console.log(req.user, req.isAuthenticated());
    res.send("user login failed!")
});

app.listen(5000, () => {
    console.log('server 5000 is ready!')
});