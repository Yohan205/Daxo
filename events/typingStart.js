const { Client, Typing } = require('discord.js');

module.exports = {
    name: "typingStart",
    type: "on",
    /**
     * @param {Client} botxi 
     * @param {Typing} typing
     * @returns Parametros xd
     */
    run: (botxi, typing) => {
        // console.log("En el momento: "+typing.startedAt);
        // console.log(typing.channel);
    }
}