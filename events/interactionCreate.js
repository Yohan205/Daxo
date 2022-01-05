const { Client, Interaction } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    type: "on",
    /**
     * 
     * @param {Client} botxi 
     * @param {Interaction} interaction 
     * @return
     */
    run: async (botxi, interaction) => {
        // console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (interaction.isCommand()){
            const cmd = botxi.slashCommands.get(interaction.commandName);
            // console.log(interaction.webhook);
            console.log();
            if(!cmd) return;
            cmd.run(botxi, interaction);
        }

        if (interaction.isButton()){
            
            const cmd = botxi.buttons.get(interaction.customId);
            cmd.execute(botxi, interaction);
        }
    }
}