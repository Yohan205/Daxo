const { Client, Interaction } = require('discord.js');
const { arraysEqual } = require("../controllers/utilities");

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
            // console.log(interaction.options);
            if(!cmd) return;

            const isSubCmdGrpInt = interaction.options_group,
            isSubCmdInt = interaction.options._subcommand,
            cmdOptInt = interaction.options._hoistedOptions,
            cmdOpt = cmd.options;

            let subCmdInt = false, isCmdRun, cmdRun;

            console.log(cmdOpt, cmdOptInt);
            // Result expected true
            console.log(cmdOpt.some(e => e.name === isSubCmdInt || cmdOptInt.some(i => i.name === e.name)));

            // It find the command used in the interaction, else it will show an error
            cmdOpt.find(e => {
                // Si hay subcomandos, guarda el objeto subcommand
                if (e.name === isSubCmdInt){
                    return subCmdInt = e;
                    
                } // Else if it isn't there a subcommand and cmdOpt, it will return error
                else if (!cmdOptInt.some(i => i.name === e.name) && !Array.isArray(cmdOpt)) {
                     console.error("El comando no existe o no tiene opciones"); 
                    return
                }
            });
            // Result expected, Array with the options
            console.log(cmdOpt);
            // Result expected Object with the command
            console.log(subCmdInt); 

            // isCmdRun = arraysEqual(subCmdInt.options, cmdOptInt); 

            if (subCmdInt.options && subCmdInt.options.find(e => e.run)) {
                console.log("----------Sub Cmd Int-----------");

                cmdRun = subCmdInt.options.find(e => e.run)             
                console.log(cmdRun);
                cmdRun.run(botxi, interaction);

                // indexCmd = cmdOptInt.find(e => e.name === namesCmd[0]);
                console.log("---------------END-----------------");
                return;
            }

            if (subCmdInt.run) return subCmdInt.run(botxi, interaction);

            cmd.run(botxi, interaction);
            
        }

        if (interaction.isButton()){
            
            const cmd = botxi.buttons.get(interaction.customId);
            cmd.execute(botxi, interaction);
        }
    }
}