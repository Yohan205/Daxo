//Definir antes del evento message el cooldown puede ser asi:
// const { Client } = require('discord.js');
// const client = new Client();

let setCooldown = new Set();
const db = require('quick.db');
db.set('CoolDown', { id: "DB1" });

class cooldown {
    
    constructor() {
    }
    /**
     * Establece el tiempo de cooldown que tendrá el usuario
     * @param {number} time Tiempo de cooldown
     */
    setting(time, msg) {
        if (!time) return console.error('No se ha ingresado un tiempo para el cooldown')
        
        this.time = time;
        this.msg = msg;
    }
        /** Revisa si el usuario está con cooldown */
    ifHas(m) {
        var und = "",
            timeMsg = 22;
        const timeNum = this.time * 1000;
        if (this.time >= 60) {
            und = " minutos!";
            timeMsg = this.time / 60;
        } else {
            und = " segundos!";
            timeMsg = this.time;
        }
        // client.on("message", message => {
        // if (setCooldown.has(this.msg.author.id)) {
        if (db.get('CoolDown.user') === 200) {
            console.log(`Con cooldown: ${db.get('CoolDown.user')}`);
            m = this.msg.channel.send(this.msg.author.tag + 'puedes usar el comando despues de ' + timeMsg + und);
            return m;
        } else {
            db.add('CoolDown.user', 200);
            console.log("sin cooldown");
            return m;
        }
        
        // })
    }
        /** Si no tiene cooldown agrega al usuario */
    add() {
        // let be = false;
        const timeNum = this.time * 1000;
        if (!db.has('CoolDown.user')){
            // setCooldown.add(this.msg.author.id);
            console.log("sin cooldown add");
            
            setTimeout(() => {
                db.delete('CoolDown.user', 200)
                // setCooldown.delete(mens.author.id)
            }, timeNum);
            this.msg.channel.send("Usuario agregado a cooldown");
            return;
        }
        console.log(`Con cooldown add: ${db.get('CoolDown.user')}`);
    }
}

module.exports = cooldown