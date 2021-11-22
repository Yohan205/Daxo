module.exports = {
    name: "interactionCreate",
    run: async (botxi, interaction) => {
        // console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (interaction.isCommand()){
            const cmd = botxi.slashCommands.get(interaction.commandName)
            // console.log(interaction.webhook);
            console.log(cmd);
            if(!cmd) return;
            cmd.run(botxi, interaction);
        }
    }
}