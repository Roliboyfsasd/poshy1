const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class SetJoin extends Command {
    constructor (bot) {
        super(bot, {
            name: "setjoin",
            enabled: true,
            aliases: [],
            botPermissions: [ "EMBED_LINKS" ],
            permLevel: 2
        });
    }

    async run (message, args, data) {
        if(!data.guild.join.enabled){
            data.guild.join.enabled = true;
            data.guild.markModified("join");
            await data.guild.save();
            return message.channel.send(message.language.setjoin.on());
        }
        if(data.guild.join.enabled){
            data.guild.join.enabled = false;
            data.guild.markModified("join");
            await data.guild.save();
            return message.channel.send(message.language.setjoin.off());
        }
    }
};
          
module.exports = SetJoin;