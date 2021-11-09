module.exports = {
    name: "invite",
    desc: "Invita a Daxo a tu servidor",
    usage: "invite",
    aliases: [],
    isPrivate: false,
    guildOnly: false,
    category: "info",
    isOwner: true,
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
        
        message.channel.send('Este es mi link para que me invites a tu servidor :wink: : ' + link);
    }
}