const { Router } = require('express');
const passport = require("../settings/passport");

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: "Inicio",
        descPag: "En HiDaxo tenemos una gran variedad de contenido, todo depende de ti lo que quieras encontrar.",
        keywordsPag: "HiDaxo, Daxo, TheBroland, The Broland"
    })
})

router.get('/test', (req, res) => {
    var email_yohan = "cyohanalejandro@gmail.com";

    var photo_gravatar = gravatar.url(email_yohan, {s: '80', d: '404'})

    res.render('test', {
        title: "PRUEBAS",
        descPag: "Página de pruebas",
        keywordsPag: "test",
        foto_perfil: photo_gravatar
    })
})

router.get('/loginDiscord', passport.authenticate("discord", { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dash')
});
router.use("/", require("./dash.routes"));

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

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Iniciar sesión",
        descPag: "Inicia sesión con tu cuenta de Discord",
        keywordsPag: ""
    })
})

router.get('/TheBroland', (req, res) => {
    res.render('TheBroland', {
        title: "The Broland",
        descPag: "Mira más informacion sobre The Broland",
        keywordsPag: "The Broland, TheBroland, Brolandia, Server, Servidor"
    })
})

router.get('/TheBroland/images', (req, res) => {
    res.render('gallery_images', {
        title: "Galería de imágenes",
        descPag: "Fotos de The Broland",
        keywordsPag: ""
    })
})

router.get('/music', (req, res) => {
    res.render('music', {
        title: "Música",
        descPag: "Escucha algunas canciones",
        keywordsPag: ""
    })
})

router.get('/otros/comandos-de-voz-google', (req, res) => {
    res.render('CmdsGoogle', {
        title: "Comandos de voz para el asistente de google",
        descPag: "Aquí podrás ver los comandos de voz más comunes para que uses al asistente de google",
        keywordsPag: "comandos de voz, google assistant, asistente de google, google, hablar con google"
    })
})

module.exports = router;