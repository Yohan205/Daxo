const { Router } = require('express');
const {checkAuth, statusAuth} = require('../settings/checkAuth');
const passport = require("../settings/passport");
const gravatar = require('gravatar');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: "Inicio",
        descPag: "En HiDaxo tenemos una gran variedad de contenido, todo depende de ti lo que quieras encontrar.",
        keywordsPag: "HiDaxo, Daxo, TheBroland, The Broland",
        statusAuth: statusAuth(req)
    })
})

router.get('/test', (req, res) => {
    var email_yohan = "cyohanalejandro@gmail.com";

    var photo_gravatar = gravatar.url(email_yohan, {s: '80', d: '404'})

    res.render('test', {
        statusAuth: statusAuth(req),
        title: "PRUEBAS",
        descPag: "Página de pruebas",
        keywordsPag: "test",
        foto_perfil: photo_gravatar
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

// URI for the login Discord
router.get('/loginDiscord', passport.authenticate("discord", { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dash')
});

router.get('/logout', (req, res) => {
    if (req.session.id) {
        //@ts-ignore
        req.session.destroy();
    }
    res.redirect('/');
});

// Include routes from dashboard
router.use("/", require("./dash.routes"));

// Create a new page with login
router.get('/login', (req, res) => {
    res.render('login', {
        title: "Iniciar sesión",
        descPag: "Inicia sesión con tu cuenta de Discord",
        keywordsPag: ""
    })
})

// The Broland Page
router.get('/TheBroland', (req, res) => {
    res.render('TheBroland', {
        statusAuth: statusAuth(req),
        title: "The Broland",
        descPag: "Mira más informacion sobre The Broland",
        keywordsPag: "The Broland, TheBroland, Brolandia, Server, Servidor"
    })
})

router.get('/TheBroland/images', (req, res) => {
    res.render('gallery_images', {
        statusAuth: statusAuth(req),
        title: "Galería de imágenes",
        descPag: "Fotos de The Broland",
        keywordsPag: ""
    })
})

router.get('/music', (req, res) => {
    res.render('music', {
        statusAuth: statusAuth(req),
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

router.get('/Privacy-Policy', (req, res) => {
    res.render('PrivacyPolicy', {
        statusAuth: statusAuth(req),
        title: 'Privacy Policy',
        desPag: 'Privacy Policy\'s Daxo',
    });
});

router.get('/unirseAlServer', (req, res) => {
    res.redirect('/TheBroland#addServer');
});

module.exports = router;