const Zeew = require('zeew');

module.exports = {
    name: "test",
    desc: "Comando de pruebas",
    usage: "test",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    status: true,
    run: async (botxi, message, args, BOT) => {
        // console.log(botxi.users)
        // console.log(args[1])
        // console.log(message.guild.memberCount);

        // let infoRol = []; 
        
        /* for (let ro of message.guild.members.resolve(message.author.id).roles.cache){
            const r = ro[1];
            const RO = message.guild.roles.resolve(r.id);
            if (r.name !== "@everyone"){
                
            }
            var infos = {
                id: r.id,
                name: r.name,
                color: r.color, 
                hoist: r.hoist, 
                rawPosition: r.rawPosition
            }
            infoRol.push(infos)
        }
        const rolAlto = message.member.roles.highest;
        for (const e of infoRol){
            if (rolAlto.id == e.id) {
                console.log(rolAlto.color);
            }
        } */
        message.delete({ timeout: 6000 });        
    }
}