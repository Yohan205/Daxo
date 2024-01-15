const { Router } = require('express');
const {checkAuth, checkAuthDiscord, statusAuth} = require('../settings/checkAuth');
const { dataUser } = require("../controllers/utilities");
const BOT = require("../settings/config");

const router = Router();

router.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hi there, your application is awesome!')
});

module.exports = router;