const { Router } = require('express');
const YTDL = require('@yohancolla/ytdl');
const { JSDOM } = require("jsdom");
const { checkAuth, checkAuthDiscord, statusAuth } = require('../settings/checkAuth');
const { dataUser, expandPinURL } = require("../controllers/utilities");
const { BOT } = require("../settings/config");

const router = Router();

const ytdl = new YTDL({
    outputPath: './public/VIDEO/',
    deleteTimeout: (3*60)
});

router.get('/', (req, res) => {
    //console.log(req.body);
    res.status(200).send({OK: 'Hi there, your application is running!... Or is burning?'})
});

router.post('/ytdl', async (req, res) => {
    let { link } = req.body;
    console.log(req.body);

    ytdl.toMp4(link);

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

router.get("/pinterest", async (req, res) => {
    var url = req.query.url;

    if (!url) res.status(400).send('Bad Request');

    try {
        //@ts-ignore
        if (url.match("pin.it")) url = await expandPinURL(url);
        //@ts-ignore
        const { hostname, pathname } = new URL(url);
        const path = pathname.replace("/sent/", "");
        const finalUrl = `https://${hostname}${path}`;
        const response = await fetch(finalUrl);

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const body = await response.text();
        let outUrl;
        let type = "video";

        try {
            const video = new JSDOM(body).window.document.getElementsByTagName("video")[0].src;
            outUrl = video.replace("/hls/", "/720p/").replace(".m3u8", ".mp4");
        } catch (_) {
            outUrl = new JSDOM(body).window.document.getElementsByTagName("img")[0].src;
            type = "image";
        }
  
      const title = new JSDOM(body).window.document.querySelector('div[data-test-id="pinTitle"] h1').innerHTML;
      var desc;

      try {
          // Description may not be available
          desc = new JSDOM(body).window.document.querySelector('div[data-test-id="truncated-description"] div div span').innerHTML;
      } catch (_) {
        desc = 'No description'
      }
  
      //console.log(outUrl);
  
      res.status(200).send({
          url: outUrl,
          //@ts-ignore
          typeUrl: url.match("pin.it") ? "Pinterest shorten url" : "Pinterest full url",
          type: type,
          title: title,
          decsURL: desc
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error });
    }
});

router.get("/instagram", async (req, res) => {
    const url = req.query.url;
    if (!url) res.sendStatus(400).send('Bad Request');

    try {
        //@ts-ignore
        if (url.match("instagram.com")) {
        const response = await fetch(`https://instagram-videos.vercel.app/api/video/?url=${url}`, {
            method: 'GET',
        });

        const uri = response.json();
        
        res.status(200).send({
          url: uri,
          title: "Instagram shorten url",
        });
      } else {
        res.status(200).send({
          error: "Not a valid url",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
});

module.exports = router;