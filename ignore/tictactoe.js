const Discord = require('discord.js');
// const { Calculator } = require('weky');

module.exports = {
    name: "ttt",
    desc: "Juega tres en raya contra mi u otro jugador",
    usage: "ttt",
    aliases: ["ttt",],
    isPrivate: false,
    guildOnly: false,
    category: "fun",
    cooldown: 3,
    status: false,
    /**
    * @param {Discord.Client} botxi
    * @param {Discord.Message} message
    * @param {String} args
    * @returns
    */
    run: async(botxi, message, args) => {

        await Calculator({
			message: message,
			embed: {
				title: 'Calculator | Weky Development',
				color: '#5865F2',
				footer: '©️ Weky Development',
				timestamp: true,
			},
			disabledQuery: 'Calculator is disabled!',
			invalidQuery: 'The provided equation is invalid!',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
    }
}
