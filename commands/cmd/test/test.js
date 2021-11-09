module.exports = {
    name: "test",
    desc: "Comando de pruebas",
    usage: "test",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    run: (botxi, message, args, BOT) => {
        console.log(BOT)
        console.log(botxi.users)
        message.delete({ timeout: 6000 });
    }
}