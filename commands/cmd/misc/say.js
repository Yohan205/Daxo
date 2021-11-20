module.exports = {
    name: "say",
    desc: "Hace que el bot diga lo que escribas",
    usage: "say",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "misc",
    isOwner: true,
    status: true,
    run: (botxi, message, args) => {
        message.channel.send("Tu mensaje fue: ```"+`${args.join(" ")}`+" ```")
    }
}