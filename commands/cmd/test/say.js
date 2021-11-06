module.exports = {
    name: "say",
    desc: "Hace que el bot diga lo que escribas",
    usage: "say",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "test",
    isOwner: true,
    run: (botxi, message, args) => {
        message.channel.send("Tu mensaje fue: "+`${args.join(" ")}`)
        // message.reply('Pong!');

    }
}