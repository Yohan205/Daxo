const { Router } = require('express');
const fetch = require('node-fetch').default;
const {checkAuth, statusAuth} = require('../settings/checkAuth');
const { dataUser, getYTPlaylistID, getAllPlaylistItems } = require("../controllers/utilities");
// const passport = require("../settings/passport");
const { BOT } = require("../settings/config");
const gravatar = require('gravatar');

const router = Router();

router.get('/', async (req, res) => {
    res.render('home', {
        title: "Inicio",
        descPag: "En HiDaxo tenemos una gran variedad de contenido, todo depende de ti lo que quieras encontrar.",
        keywordsPag: "HiDaxo, Daxo, TheBroland, The Broland",
        statusAuth: statusAuth(req),
        user: statusAuth(req) ? await dataUser(req) : null,
    })
})

router.get('/testjs-task', checkAuth, async (req, res) => {
    var user = await dataUser(req);
    //console.log(user);
    console.log("-------------------------------");
    const URI = `https://tasks.googleapis.com/tasks/v1/users/@me/lists`
    const response = await fetch(URI, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
    });
    //console.log(response);
    let result = await response.text();
    result = JSON.parse(result);
    console.log(result);
    res.json({
        status: response.status,
        res: result
    });   
});

router.get('/testjs', checkAuth, async (req, res) => {
    var user = await dataUser(req);
    //console.log(user);
    console.log("-------------------------------");
    
    /* var params = `?part=snippet%2CcontentDetails&maxResults=30&key=${user.accessToken}`
    const paramListID = params+'&mine=true'
    
    const URI1 = `https://youtube.googleapis.com/youtube/v3/playlists${paramListID}`
    const response1 = await fetch(URI1, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
    });
    //console.log(response);
    /**
     * @type {Object}
     *
    var result1 = await response1.text();
    result1= JSON.parse(result1); */
    const { items } = await getYTPlaylistID({accessToken: user.accessToken})
    console.log(items[3]);

    const result = await getAllPlaylistItems(items[3].id, user.accessToken);
    console.log(result);


    res.json({
        // status: response.status,
        res: result
    })
});

router.get('/test', checkAuth, async (req, res) => {
    
    var user = await dataUser(req);
    
    console.log(user);
    //user.picture = gravatar.url(user.email, {s: '80', d: '404'});

    res.render('test', {
        statusAuth: statusAuth(req),
        title: "PRUEBAS",
        descPag: "Página de pruebas",
        keywordsPag: "test",
        user,
    })
})

//Using the API of Geometry Dash
router.post('/apiGD', (req, res) => {
    // let id = req.params.id;
    console.log(req.body);
    const { userGD } = req.body;
    if (userGD === "") return res.redirect('/');
    
    /* res.json({
        userGD,
    }); */
    res.render('geometry_dash', {
        title: "Geometry Dash Api",
        descPag: "API de GeometryDash",
        keywordsPag: "",
        userGD,
    });
});

// Include routes from dashboard
router.use("/dash", require("./dash.routes"));

// Page to logout
router.get('/logout', (req, res) => {
    if (req.session.id) {
        //@ts-ignore
        req.session.destroy();
    }
    res.redirect('/');
});

// Create a new page with login
router.get('/login', (req, res) => {
    res.render('login', {
        title: "Iniciar sesión",
        descPag: "Inicia sesión con tu cuenta de Discord",
        keywordsPag: ""
    })
})

//Routes to authenticate users with service provider
router.use("/auth", require("./auth.routes"));

// The Broland Page
router.get('/TheBroland', async (req, res) => {
    res.render('TheBroland', {
        statusAuth: statusAuth(req),
        user: statusAuth(req) ? await dataUser(req) : null,
        title: "The Broland",
        descPag: "Mira más informacion sobre The Broland",
        keywordsPag: "The Broland, TheBroland, Brolandia, Server, Servidor"
    })
})

router.get('/TheBroland/images', async (req, res) => {
    res.render('gallery_images', {
        statusAuth: statusAuth(req),
        user: statusAuth(req) ? await dataUser(req) : null,
        title: "Galería de imágenes",
        descPag: "Fotos de The Broland",
        keywordsPag: ""
    })
})

router.get('/music', async (req, res) => {
    res.render('music', {
        statusAuth: statusAuth(req),
        user: statusAuth(req) ? await dataUser(req) : null,
        title: "Música",
        descPag: "Escucha algunas canciones",
        keywordsPag: ""
    })
})

router.get('/otros/comandos-de-voz-google', (req, res) => {
    res.render('CmdsGoogle', {
        statusAuth: statusAuth(req),
        title: "Comandos de voz para el asistente de google",
        descPag: "Aquí podrás ver los comandos de voz más comunes para que uses al asistente de google",
        keywordsPag: "comandos de voz, google assistant, asistente de google, google, hablar con google"
    });
});

router.get('/Privacy-Policy', async (req, res) => {
    res.render('PrivacyPolicy', {
        statusAuth: statusAuth(req),
        user: statusAuth(req) ? await dataUser(req) : null,
        title: 'Privacy Policy',
        desPag: 'Privacy Policy\'s Daxo',
    });
});

router.get('/Terms-Conditions', async (req, res) => {
    res.render('TermsAndConditions', {
        statusAuth: statusAuth(req),
        user: statusAuth(req) ? await dataUser(req) : null,
        title: 'Terms and Conditions',
        desPag: 'Terms\'s Daxo',
    });
});

// Include routes from API
router.use("/api", require("./api.routes"));

router.get('/unirseAlServer', (req, res) => {
    res.redirect('/TheBroland#addServer');
});

module.exports = router;