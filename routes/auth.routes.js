//@ts-nocheck
const { Router } = require('express');
const passport = require("../settings/passport");
const {checkAuth, checkAuthDiscord, statusAuth} = require('../settings/checkAuth');
const { dataUser } = require("../controllers/utilities");
const {GOOGLE} = require("../settings/config");

const router = Router();

// URI for the login Discord
router.get('/discord', passport.authenticate("discord", { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dash')
});

// Auth Google account
router.get('/google',
  passport.authenticate('google', { scope: GOOGLE.Scopes}
));

router.get( '/google/callback', passport.authenticate('google', { failureRedirect: "/login" }),
    function(req, res) { res.redirect("/test");
});

module.exports = router;