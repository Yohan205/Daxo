//Definir antes del evento message el cooldown puede ser asi:
const { Client, Message } = require('discord.js');
const db = require('quick.db')
const client = new Client();
db.set('CoolDown', { id: 'DB1' });
let setCooldown = new Set();

class cooldown {
    /**
     * Establece el tiempo de cooldown que tendrá el usuario
     * @param {number} time Tiempo de cooldown
     */
    constructor(time, msg, client) {
            if (!time) {
                return console.error('No se ha ingresado un tiempo para el cooldown')
            }
            this.time = time;
            this.msg = msg;
            this.botxi = client;
        }
        /** Revisa si el usuario está con cooldown */
    ifSet() {

            var und = "",
                timeMsg = 22;
            // const timeNum = this.time * 1000;
            if (this.time >= 60) {
                und = " minutos!";
                timeMsg = this.time / 60;
            } else {
                und = " segundos!";
                timeMsg = this.time;
            }
            // client.on("message", message => {
            if (setCooldown.has(this.msg.author.id)) {
                // if (db.get('CoolDown.user') === 200) {
                this.msg.channel.send(this.author.username + 'puedes usar el comando despues de' + timeMsg + und);
                return;
            } else {
                setCooldown.add(this.msg.author.id);
                // db.add('CoolDown.user', 200);
                setTimeout(function(mens) {
                    // db.delete('CoolDown.user', 200)
                    setCooldown.delete(mens.author.id)
                }, timeMsg);
            }
            // })
        }
        /** Si no tiene cooldown agrega al usuario */
    add() {
        var LOG = db.get('CoolDown.user');
        var canal = this.msg.id;
        const MESSAGE = this.msg.channel.send('HOLA #' + canal)
            // new Message(this.botxi, '', canal);

        // return;
        // client.on("message", message => {

        // })
    }
}

module.exports = cooldown