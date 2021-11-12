module.exports = {
    name: "test",
    desc: "Comando de pruebas",
    usage: "test",
    status: false,
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    run: (botxi, message, args, BOT) => {
        console.log(botxi.users)
        // console.log(message.guild.memberCount);
        message.delete({ timeout: 6000 });
    }
}