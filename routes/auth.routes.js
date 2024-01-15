//@ts-nocheck
const { Router } = require('express');
const passport = require("../settings/passport");
const {checkAuth, checkAuthDiscord, statusAuth} = require('../settings/checkAuth');
const { dataUser } = require("../controllers/utilities");
const BOT = require("../settings/config");

const router = Router();

// URI for the login Discord
router.get('/loginDiscord', passport.authenticate("discord", { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dash')
});

// Auth Google account
router.get('/auth/google',
  passport.authenticate('google', { scope: BOT.GOOGLE.Scopes}
));

router.get( '/auth/google/callback', passport.authenticate('google', { failureRedirect: "/login" }),
    function(req, res) { res.redirect("/test");
});

module.exports = router;