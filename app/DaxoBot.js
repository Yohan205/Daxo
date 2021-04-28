/* Para iniciar el bot: npm start
para crear una carpeta npm: npm init
Para instalar una libreria npm: npm install(i) [--save, -D (como dependenciaDesarrollo)] (nombre libreria)
para usar libreria nodemon: npx nodemon --help
*/

const { Client, MessageEmbed } = require("discord.js"); // Extract the required classes from the discord.js module
const botxi = new Client(); // Create an instance of a Discord client
const config = require("./config.json"); //Extract the objects from config.json
//require("/functions.js");
let cooldownSet = new Set();
//const botdash = require('botdash.pro'); //Require botdash.pro
//const { prefix, token } = require('./config.json');

botxi.once("ready", () => { //Al iniciar el bot...
    botxi.user.setPresence({
        status: "online",
        activity: {
            name: "Daxo help",
            type: "PLAYING"
        }
    });
    console.log(
        `Estoy listo! conectado en ${botxi.guilds.cache.size} servidores y  ${botxi.users.cache.size} usuarios.`
    );
});

botxi.on("message", async message => {
    const prefixes = ['d ', 'daxo ', 'Daxo ', 'D '];
    let prefix = false;
    for (const thisPrefix of prefixes) {
        if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if (!prefix) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    console.log(message.content);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift(); //.toLowerCase();
    const server = message.guild; //Por si falla, se menciona el servidor botxi.guilds.resolve(args[0]) ||
    //require("./functions.js");

    /*botxi.on("guildMemberAdd", member => {
        console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${member.guild.name}.`);
        var canal = botxi.channels.get("654830450920914958");
        canal.send(`${member.user}, bienvenido al servidor pasala bien.`);
    });
    if(!message.author.id !== 'IDOWNER')*/

    if (message.content.startsWith(prefix + "help") || message.content.startsWith("Daxo help")) {
        const emHelp = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Comandos de Daxo", botxi.user.avatarURL())
            .setField("Comandos de Información")
            .addField("-> `" + prefix + "brolandia`", ":: Muestra información sobre el server de Minecraft.", true)
            .addField("-> `" + prefix + "user <@user>`", ":: Muestra información sobre un usuario mencioando.")
            .addField("-> `" + prefix + "server`", ":: Muestra información del servidor donde está el bot.")
            .addField("-> `" + prefix + "inviteBot`", ":: Enviará un link para que puedas tener a Daxo en tu servidor preferido. :wink:")
            .setTitle("Comandos de Diversión")
            .addField("-> `" + prefix + "galleta`", ":: Da una galleta a un usuario.")
            .addField("-> `" + prefix + "8ball`", ":: El bot respondera a tus preguntas con una respuesta aleatoria. \nPor ejemplo: *" + prefix + "8ball hoy llueve?*")
            .addField("-> `" + prefix + "ppt`", ":: Juega `Piedra`, `Papel` o `Tijera` con Daxo y prueba tu suerte.:wink: \nPor ejemplo: *" + prefix + "ppt piedra*")
            .addField("-> `" + prefix + "love`", ":: El bot calculará el porcentaje de amor entre dos usuarios 7u7. \nPor ejemplo: *" + prefix + "love <@usuario1> <@usuario2>*")
            .setTitle("Comandos Admin/Moderadores")
            .addField("-> `" + prefix + "rol <@user> <rol>`", ":: Muestra información del rol de un usuario mencionado.")
            .addField("-> `" + prefix + "rol-list`", ":: Muestra los roles del servidor.")
            .addField("-> `" + prefix + "rol-add <@user> <rol>`", ":: Agrega un rol a un usuario mencionado.")
            .addField("-> `" + prefix + "rol-remove <@user> <rol>`", ":: Quita un rol de un usuario mencionado.")
            .setTitle("Comandos de Interacción")
            .addField("-> `" + prefix + "saludos`", ":: Retorna un saludo como mensaje.")
            .addField("-> `" + prefix + "announce`", ":: Hace que el bot diga un mensaje (AUN EN DESARROLLO).")
            .setFooter("Unete al servidor de soporte para conocer más sobre el bot", botxi.user.avatarURL());
        message.channel.send(emHelp);
        /*"**" + message.author.username + "**, Revisa tus mensajes privados.");
                //message.author.send( //Envia el mensaje al DM
         +
        "-> " + prefix + "ping           :: Comprueba la latencia del bot y de tus mensajes.\n"*/
    }
    if (command === "brolandia") {
        const embed = new MessageEmbed()
            .setTitle("The Broland Server")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(0x00aefb)
            .setDescription("Ip y Puerto del server TheBroland. Usa la versión *1.16.40* . Si eres nuevo no olvides enviar tu nametag de Minecraft para que puedas entrar!")
            .setFooter("Info The Broland", botxi.user.avatarURL)
            .setImage()
            .setThumbnail()
            .setTimestamp()
            .addField("Server IP", "`134.255.253.130`")
            .addField("Server Port", "`19234`", true)
            /*.addField("You can too add server TheBroland to minecraft, Click here:http://minecraft://?addExternalServer=TheBroland|148.251.124.94:22011")*/
            .setURL()
            .addBlankField(true);
        message.channel.send({ embed }).then(m => {
            m.delete(90000);
        });
    }

    if (command === "galleta") {
        var und = "",
            timeMsg = "",
            time = 10;
        if (time >= 60) {
            und = " minutos!";
            timeMsg = time / 60;
        } else {
            und = " segundos!";
            timeMsg = time;
        }

        if (cooldownSet.has(message.author.id)) {
            message.channel.send(message.author.username + " puedes usar el comando despues de " + timeMsg + und);
            return;
        }
        //cooldownIf(20);
        let user = message.mentions.users.first() || //por mencion
            server.members.resolve(args[0]); //por id
        let razon = args.slice(1).join(" ");

        if (!user) return message.channel.send("Menciona a un usuario para darle una galleta >.<");

        if (!razon) { razon = "Sin razón alguna :grin:"; }

        const emCookie = new MessageEmbed()
            .setColor("0xF49F0A")
            .setAuthor(message.author.username, message.author.avatarURL())
            //.setFooter(botxi.user.username, botxi.user.avatarURL())
            .setThumbnail(message.author.avatarURL())
            .setTitle("***" + user.username + ", *** tienes una :cookie: de **" + message.author.username + "**")
            .setDescription("*Razón:* " + razon + "\n\n***(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie:***");
        /*zeew.sfw.hug().then((hug) => console.log(hug));
        let cokie = zeew.sfw.cookie();*/
        message.channel.send(emCookie);
        cooldownAdd(10);
    }

    if (command === "8ball") {
        let text = args.join(" ");
        var rpts = [
            "Sí",
            "No",
            "¿Por qué?",
            "Por favor",
            "Tal vez",
            "Ummm... No sé",
            "Definitivamente",
            " ¡Claro! ",
            " Sí ",
            " No ",
            " Por supuesto! ",
            " Por supuesto que no "
        ];
        if (!text) return message.reply(`Escriba una pregunta.`);

        const em8ball = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setFooter(botxi.user.username, botxi.user.avatarURL())
            .addField(message.author.username + " a su pregunta `" + text + "`",
                "Mi respuesta es: `" + rpts[Math.floor(Math.random() * rpts.length)] + "`");

        if (cooldown.has(message.author.id)) {
            message.channel.send(message.author.username + " utilice el comando despues de 10 segundos!");
            return;
        }

        message.channel.send(em8ball);

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 10000);
    }

    if (command == "encuesta") {
        message.delete({ timeout: 7000 }); //Elimina el mensaje del autor despues de 7 segundos

        let reporte = args.join(' '); //Aqui se guarda la pregunta
        //if (!message.member.roles.cache.get('ID-RANGO')) return; //Podes poner permisos si lo quieres hacer privado el comando
        if (!reporte) return message.channel.send(`:grey_exclamation: | **Envia tu pregunta**`)

        const embed = new MessageEmbed()
            .setTitle(':e_mail: | **Votación Activada**')
            .addField('**Pregunta: ' + reporte + '**', '▔▔▔▔▔▔▔▔▔▔')
            .addField('Opcion 1', '1\u20e3 Si')
            .addField('Opcion 2', '2\u20e3 No')
            .setColor(0x77AEFF)
            .setFooter('Votación enviada por ' + message.author.tag, message.author.avatarURL());
        message.channel.send(embed).then(m => {
            m.react("1\u20e3");
            m.react("2\u20e3");
        });

        /*let canal = server.channels.cache.find(ch => ch.id == "835748557570310187"); //si hay un canal para logs colocar la id del canal
            let canal = client.channels.get("ID-CANAL");  const e = new MessageEmbed()
            .setTitle("Sistema de logs por votacion").setDescription("Esto se activa, por votacion activada")
            .addField("Se ha activado el sistema y dice", reporte, false)
            canal.send(e)
                            NOTA: CONFIGURAR ESTE COMANDO*/
    }

    switch (command) { //Games-ejemplo Embed
        case "saludos":
            var und = " segundos!",
                timeMsg = 10;

            if (cooldownSet.has(message.author.id)) {
                message.channel.send(message.author.username + " puedes usar el comando despues de " + timeMsg + und);
                return;
            }
            //cooldownIf(20);
            const emSld = new MessageEmbed()
                .setTitle("Y salutaciones xD :joy:")
                .setColor("RANDOM");
            message.channel.send(emSld);
            cooldownAdd(10);
            break;
        case 'clearMsg':
            message.channel.send("Se borrarán todos los mensajes de este canal...");

            message.channel.fetch().then(d => d.delete()).catch(e => {
                console.log('Ocurrio un error y no pude borrar los mensajes')
            });
            break;
        case "announce":
            let text = args.join(" ");
            //let rolDest = message.guild.roles.find("name", args.slice(1).join(" "));
            if (!text) {
                return;
                message.channel.send(`Escriba un contenido para decir.`);
            }
            let rolDest = "@everyone";
            //if(!rolDest){rolDest = '@everyone'}
            /*const embed = new MessageEmbed()
        .setTitle("Announce")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0xFD2100)
    .setDescription(text)
    .setFooter(botxi.user.avatarURL)
    .setImage()
    .setThumbnail()
    .setTimestamp()
    .setURL()
    .addBlankField(true);
botxi.on('messageUpdate', (oldMessage, newMessage) => {
  if(newMessage.content...){
    ...
  }
})*/

            message.channel.send(rolDest + text);
            break;
        case 'ejemploEmbed':
            const ejemploembed = new MessageEmbed()
                .setTitle("Este es su título, puede contener 256 caracteres")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor(0x00AE86)
                .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
                .setFooter("Pie de página, puede contener 2048 caracteres", botxi.user.avatarURL())
                .setImage(message.author.avatarURL())
                .setThumbnail(message.author.avatarURL())
                .setURL("https://yohancolla.ga/TheBroland.php")
                .addField("Este es un título de campo, puede contener 256 caracteres",
                    "Este es un valor de campo, puede contener 2048 caracteres.")
                .addField("Campo en línea", "Debajo del campo en línea", true)
                .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);
            message.channel.send(ejemploembed);
            break;
        case 'love':
            let personas = message.mentions.users.map(m => m.username).join(' y ');

            if (!personas) return message.channel.send('Tienes que mencionar a dos usuarios para calcular');

            const random = Math.floor(Math.random() * 100);
            let heard = "";

            if (random < 50) {
                heard = ':broken_heart:';

            } else if (random < 80) {
                heard = ':sparkling_heart: :two_hearts:';

            } else if (random < 101) {
                heard = ':heartpulse: :revolving_hearts:';

            }

            const embedLove = new MessageEmbed()
                .setTitle('El porcentaje de amor de ' + personas + ' es:')
                .setDescription(heard + ' **' + random + ' %**' + ' ' + heard)
                .setColor("RANDOM")

            message.channel.send(embedLove);
            break;
        case 'inviteBot':
            botxi.generateInvite(["ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_MESSAGES", "SEND_MESSAGES", "CONNECT", "BAN_MEMBERS", "PRIORITY_SPEAKER", "STREAM"])
                .then(li => {
                    message.channel.send('Este es mi link para que me invites a tu servidor :wink: : ' + li);
                });
            break;
        case "ppt":
            // Condicionaremos que si el usuario no manda ningun argumento. O sea solo escribe el comando. *
            if (!args[0]) return message.channel.send("Opciones: `piedra`, `papel` o `tijera`").then(m => m.delete({ timeout: 10000 })) //El .then() es opcional, yo siempre lo agrego porque me gusta.

            // Haremos una declaracion en matriz con las diferentes opciones ya dichas.
            let Options = ["piedra", "papel", "tijera"];
            // Condicionamos la matriz con el metodo .includes() que nos va a determinar si lo que mandamos esta dentro de la matriz, si es si no devolvera true sino false.
            if (!Options.includes(args[0].toLowerCase())) return message.reply(":x: Opcion incorrecta!").then(d => d.delete({ timeout: 60000 }));

            //Ahora empezamos a obtener las cosas de la matriz y condicionamos..

            // Si args[0] es igual a "piedra" es decir, if(args[0] == <-piedra-/papel/tijera>)
            if (args[0] == "piedra") {
                // Creamos una condicional de matriz que tendra las respuestas.
                let random1 = ["He ganado! Jejej Elegi papel :page_facing_up:. El papel cubre a la roca. :sunglasses:", // Perdedor -jeje-
                        "Has ganado! Elegi tijera :scissors:. Las tijeras no pueden cortar rocas. :pensive:", // Ganaste :D
                        "Empate. :rock: vs :rock:, gana... La piedra! :neutral_face:"
                    ] // Empate ._.

                // Enviamos el mensaje aplicando Math.random() que nos dara una respuesta aleatoria de la matriz.
                message.reply(" " + random1[Math.floor(Math.random() * random1.length)] + "")

                // Si no es "piedra", pero es "papel"
            } else if (args[0] == "papel") {

                let random2 = ["He ganado! Elegi tijera :scissors:. Las tijeras cortan el papel. :sunglasses:", // Perdedor -jeje-
                    "Has ganado! Elegi piedra :rock:. El papel cubre a la roca. :unamused:", // Ganaste :D
                    "Empate.. :page_facing_up: vs :page_facing_up: ._."
                ]

                message.reply(" " + random2[Math.floor(Math.random() * random2.length)] + "")

            } else if (args[0] == "tijera") {
                let random3 = ["He ganado! Elegi piedra :rock:. Tus tijeras no pueden cortar rocas. :sunglasses:", // Perdedor -jeje-
                    "Has ganado! Elegi papel :page_facing_up:. Las tijeras cortan el papel. :confused:", // Ganaste :D
                    "Empate! :scissors: contra :scissors:... ._. :handshake:"
                ]

                message.reply(" " + random3[Math.floor(Math.random() * random3.length)] + "")
            }
            break;
    }
    if (command === "server") {

        const embed = new MessageEmbed()
            .setAuthor(server.name, server.iconURL())
            .setColor(0xe9f10a)
            .setFooter("Daxo | Shard:" + server.shardID, botxi.user.avatarURL())
            .addField("ID", server.id, true)
            .addField("Region", server.region, true)
            .addField("Creado el", server.joinedAt.toDateString(), true)
            .addField("Dueño del Servidor", server.owner.user.username + "#" + server.owner.user.discriminator, true)
            .addField("Miembros", server.memberCount, true)
            .addField("Roles", server.roles.cache.size, true)
            .addField("Canales", server.channels.cache.size, true)
            .addField("Emojis", server.emojis.cache.size, true)
            .setThumbnail(server.iconURL());

        message.channel.send({ embed });
    }
    if (command === "user") {
        let userm = message.mentions.users.first();
        if (!userm) {
            var user = message.author;

            const embed = new MessageEmbed()
                .setThumbnail(user.avatarURL)
                .setAuthor(user.username + "#" + user.discriminator, user.avatarURL)
                .addField(
                    "Jugando a",
                    user.presence.game != null ? user.presence.game.name : "Nada",
                    true
                )
                .addField("ID", user.id, true)
                .addField("Estado", user.presence.status, true)
                .addField("Apodo", message.member.nickname, true)
                .addField("Cuenta Creada", user.createdAt.toDateString(), true)
                .addField("Fecha de Ingreso", message.member.joinedAt.toDateString())
                .addField(
                    "Roles",
                    message.member.roles.cache.map(roles => `\`${roles.name}\``).join(", ")
                )
                .setColor(0x66b3ff);

            message.channel.send({ embed });
        } else {
            const embed = new MessageEmbed()
                .setThumbnail(userm.avatarURL)
                .setAuthor(userm.username + "#" + userm.discriminator, userm.avatarURL)
                .addField(
                    "Jugando a",
                    userm.presence.game != null ? userm.presence.game.name : "Nada",
                    true
                )
                .addField("ID", userm.id, true)
                .addField("Estado", userm.presence.status, true)
                .addField("Cuenta Creada", userm.createdAt.toDateString(), true)
                .setColor(0x66b3ff);

            message.channel.send({ embed });
        }
    }

    /*Working with rol*/
    if (command === "rol") {
        let persona = message.mentions.members.first() || //por mencion
            message.guild.members.resolve(args[0]) || //por id
            message.member;

        if (persona == message.member) {
            if (!args) { message.channel.send("Debes poner el nombre del rol"); return; }

            var rol = message.guild.roles.cache.find(r => r.name == args.join(' ')) || //busca nombre rol
                message.guild.roles.cache.find(r => r.id == args.join(' '));
            if (!rol) { message.channel.send('Rol no encontrado en el servidor'); return; }

            if (persona.roles.cache.some(r => r == rol)) {
                message.channel.send(`Tu si tienes el rol \`${rol.name}\` `)
            } else {
                message.channel.send(`Tu no tienes el rol \`${rol.name}\` `)
            }
        } else {
            let nombrerol = args.slice(1).join(' ')
            if (!nombrerol) { message.channel.send("Debes poner el nombre del rol despues de la mencion o id"); return; }

            let rol = message.guild.roles.cache.find(r => r.name == nombrerol)
            if (!rol) { message.channel.send('Rol no encontrado en el servidor'); return; }

            if (persona.roles.cache.some(r => r == rol)) {
                message.channel.send(`**${persona.user.tag}** si tiene el rol \`${rol.name}\` `)
            } else {
                message.channel.send(`**${persona.user.tag}** no tiene el rol \`${rol.name}\` `)
            }
        }
    }

    if (command === "rol-add" || command === "rl-a") {
        if (!server.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Que mal, no tengo permisos para hacer eso") //revisa si el bot tiene permiso para añadir roles
        }

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Wey no tienes permisos para hacer eso! D:") //revisa si el autor tiene el permiso
        }

        let persona = message.mentions.members.first() || //por mencion
            message.guild.members.resolve(args[0]); //por id

        if (!persona) return message.channel.send('Oye menciona o pon la id de alguien para darle el rol')

        if (!args[1]) {
            return message.channel.send('Menciona o pon el nombre o id del rol a dar sino, cómo voy a saber que rol quieres jsjsjs')
        }

        let rol = message.mentions.roles.first() || //por mencion
            message.guild.roles.resolve(args[1]) || //por id
            message.guild.roles.cache.find(r => r.name == args.slice(1).join(' ')); //por nombre

        if (!rol) {
            return message.channel.send('Parece que ese rol no está en el servidor :/')
        } else if (!rol.editable) {
            return message.channel.send('Lo siento, pero no puedo darle ese rol a nadie, pues es más alto que mi rol')
        } else if (rol.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send('El rol mencionado es más alto que tu rol (en lo que a jerarquia se refiere), asi no puedes darselo a nadie')
        }

        persona.roles.add(rol)
            .catch(e => message.reply('Ups, ocurrio un **error** vuelve a intentarlo'))
            .then(() => {
                message.channel.send(`Listo, le agrege el rol **${rol.name}** a **${persona.user.username}**`)
            })

        if (cooldown.has(message.author.id)) {
            message.channel.send(`Hey **${message.author.username}** utiliza el comando despues de 10 segundos!`);
            return;
        } //cooldown 10s

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 10000);
    }

    if (command === "rol-remove" || command == "rl-r") {
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Que mal, no tengo permisos para hacer eso")
        }

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("Wey no tienes permisos para hacer eso! D:")
        }

        let persona = message.mentions.members.first();
        if (!persona) return message.channel.send('Oye menciona o pon la id de alguien para quitarle el rol')

        let nombrerol = args.slice(1).join(' ');
        if (!nombrerol) return message.channel.send('Escribe el nombre completo del rol a quitar')

        let rolname = server.roles.cache.find(r => r.name == nombrerol);
        //console.log(message.member);
        if (!rolname) {
            return message.channel.send('Parece que ese rol no está en el servidor :confused:')
        } else if (!rolname.editable) {
            return message.channel.send("Lo siento, pero no puedo quitarle ese rol a nadie, debido a que esta mas alto que mi rol")
        } else if (rolname.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send("Ese rol es mas alto que tu rol mas alto (en lo que a jerarquia se refiere), asi no puedes quitarselo a nadie")
        }
        /*let reason = args.slice(2).join('');
        if(!reason) return message.channel.send("Necesitas decir una razón");*/

        persona.roles.remove(rolname.id).catch(e => message.reply("Ocurrio un **error**"))
        message.channel.send(`Listo! le quité el rol **${rolname.name}** a **${persona.user.username}**`)
            //message.channel.send(`Listo, le saque el rol **${rol.name}** a **${persona.user.username}** con la razon de: _${reason}`)
        if (cooldown.has(message.author.id)) {
            message.channel.send(message.author.username + " utilice el comando despues de 10 segundos!");
            return;
        }
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 10000);
    }

    if (command === 'rol-list' || command === 'rl-l') {
        const embed = new MessageEmbed()
            .setColor(0x00AE86)
            .setDescription(
                server.roles.cache.map(role => `<@&${role.id}>`)
                .join('\n')
            )
            .setFooter(`Lista de roles de: ${server.name}`, server.iconURL());
        message.channel.send({ embed }); //Lists of rols
        if (cooldown.has(message.author.id)) {
            message.channel.send(message.author.username + " utiliza el comando despues de 10 segundos!");
            return;
        } //cooldown 10s

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 10000);
    }

    function cooldownIf(time) {
        var und = "",
            timeMsg = "";
        if (time >= 60) {
            und = " minutos!";
            timeMsg = time / 60;
        } else {
            und = " segundos!";
            timeMsg = time;
        }

        if (cooldownSet.has(message.author.id)) {
            message.channel.send(message.author.username + " puedes usar el comando despues de " + timeMsg + und);
            return;
        }
    }

    function cooldownAdd(time) {
        const timeNum = time * 1000;
        cooldownSet.add(message.author.id);
        setTimeout(function() {
            cooldownSet.delete(message.author.id)
        }, timeNum);
    }
});
botxi.once("error", e => console.error(e));
botxi.once("warn", e => console.warn(e));
botxi.once("debug", (e) => console.info(e));
botxi.login(config.TOKEN); //Login to Discord Client