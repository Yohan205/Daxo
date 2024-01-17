//@ts-nocheck
const { Router } = require('express');
const YoutubeDownloader = require('@yohancolla/ytdl');
const {checkAuth, checkAuthDiscord, statusAuth} = require('../settings/checkAuth');
const { dataUser } = require("../controllers/utilities");
const {BOT} = require("../settings/config");

const router = Router();

const ytdl = new YoutubeDownloader({
    outputPath: './public/VIDEO/',
    fileTimeout: (3*60),
    youtubeVideoQuality: '18',//'hightestvideo',
});

router.get('/', (req, res) => {
   //let videoId = req.params.id;
    console.log(req.body);
    res.send('Hi there, your application is awesome!')
});

router.post('/', async (req, res) => {
    let { link } = req.body;
    console.log(req.body);

    await ytdl.toMp4(link);

    ytdl.on('finish', (err, data) => {
        //console.log("finish", data);
        data.output = 'http://'+BOT.WEB+'/VIDEO/'+data.videoTitle+'.mp4';
        res.send(data);
    })

    ytdl.on("error", function(error) {
        //console.log("Error", error);
        res.sendStatus(500).send(error);
    });
});

module.exports = router;