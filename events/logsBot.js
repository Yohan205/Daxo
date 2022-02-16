const fs = require('fs');
const { Client, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: "errorLog",
    type: "on",
    /**
     * 
     * @param { Client } botxi  
     * @returns Parametros xd
     */
    run: async (botxi, failure, BOT, type) => {
        const staff = [BOT.ownerID];

        let failureDate = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
        const Embed = new MessageEmbed()
        // .setAuthor('Your Favorite Bot', botxi.user.displayAvatarURL({format: 'png'}))
        .setColor('#cc3f37')
        .setDescription('He obtenido un fallo de tipo **'+type+'**\nFecha: **'+failureDate+'**\n\nPor favor, arreglarlo.');
        for(var i=0;i < staff.length;i++){ // Aquí creamos un bucle for, para que vaya enviando nuestro embed y archivo, usuario por usuario.
            let user = botxi.users.cache.get(staff[i]); // Obtiene el usuario mediante ID
            try { // Intenta escribir el error dentro del archivo error.log (El cual no existe)
                fs.writeFileSync('error.log', failure);
            } catch (e) { // Si ocurre un error, saldrá en la consola lo siguiente
                console.log(e)
                console.error('Error intentando crear archivo error.log');
            }
            let Attachment = new MessageAttachment('error.log'); // Creamos un attachment el cual sería nuestro archivo error.log
            user.send({embeds:[Embed], files:[Attachment],}) // Enviamos el Embed
             // Enviamos el archivo
            .then(() => {// Al enviar el archivo, hará lo sigueinte
                try {
                    if (fs.existsSync('error.log')) { // Verificará si el archivo error.log existe
                        try { // Si llega a existir, lo que hará es intentar borrarlo
                            fs.unlinkSync('error.log');
                        } catch (e) { // Si ocurre algún error, intentando borrar el archivo, nos lo dirá en la consola
                            console.log(e)
                            console.error('Ha ocurrido un error intentando eliminar error.log');
                        }
                    }
                } catch (e) { // Si el archivo, no existe, la ejecución del código se termina.
                    return;
                }  
            }).catch(e => { // Si ocurre un error, intentando enviar el archivo, nos lo dirá en la consola
                console.error(e);
            });
        }

        // Ahora, para emitir el evento, se debe utilizar la siguiente forma

        // botxi.emit("logsBot", botxi, 'Tipo ya sea Warn o Error', 'El error que se escribirá dentro del archivo error.log', 'Esto, déjalo así, no tocar.');
    }
}