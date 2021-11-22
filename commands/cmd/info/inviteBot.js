module.exports = {
    name: "invite",
    desc: "Invita a Daxo a tu servidor",
    usage: "invite",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    isOwner: true,
    status: true,
    run: (botxi, message, args) => {
        const link = botxi.generateInvite({
            permissions: [
              Permissions.FLAGS.ADMINISTRATOR,
              Permissions.FLAGS.MANAGE_ROLES,
              Permissions.FLAGS.MENTION_EVERYONE,
            ],
            scopes: ['bot'],
          });
          // "MANAGE_GUILD", "USE_EXTERNAL_STICKERS","MANAGE_MESSAGES", "", "CONNECT", "BAN_MEMBERS", "PRIORITY_SPEAKER", "STREAM"

          //https://discord.com/api/oauth2/authorize?client_id=668118265779716106&permissions=8&scope=applications.commands%20bot
        
        message.channel.send('Este es mi link para que me invites a tu servidor :wink: : ' + link);
    }
}