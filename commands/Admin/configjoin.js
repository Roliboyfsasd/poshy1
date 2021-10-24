const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class ConfigJoin extends Command {
    constructor (bot) {
        super(bot, {
            name: "configjoin",
            enabled: true,
            aliases: [ "join", "joinconfig" ],
            botPermissions: [ "EMBED_LINKS" ],
            permLevel: 2
        });
    }

    async run (message, args, data) {
        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send(message.language.errors.missingAdmin());
        let filter = (m) => m.author.id === message.author.id,
        opt = { max: 1, time: 90000, errors: [ "time" ] };
        
        let str = data.guild.join.enabled ? message.language.configjoin.disable(data.guild.prefix) : "";
        let msg = await message.channel.send(message.language.configjoin.instructs.message(str));

        let collected = await message.channel.awaitMessages(filter, opt).catch(() => {});
        if(!collected || !collected.first()) return msg.edit(message.language.configjoin.cancelled());
        let confMessage = collected.first().content;
        if (confMessage.length > 850) return msg.edit(message.language.configjoin.longmessage());
        if(confMessage === "cancel") return msg.edit(message.language.configjoin.cancelled());
        if(confMessage === data.guild.prefix+"setjoin") return;
        collected.first().delete();

        msg.edit(message.language.configjoin.instructs.channel());

        collected = await message.channel.awaitMessages(filter, opt).catch(() => {});
        if(!collected || !collected.first()) return msg.edit(message.language.configjoin.cancelled());
        let confChannel = collected.first();
        if(confChannel.content === "cancel") return msg.edit(message.language.configjoin.cancelled());
        let channel = confChannel.mentions.channels.first()
        || message.guild.channels.cache.get(confChannel.content)
        || message.guild.channels.cache.find((ch) => ch.name === confChannel.content || ch.type === "text" ||`#${ch.name}` === confChannel.content);
        if (channel.type === "category"){
            return msg.edit(message.language.configjoin.errors.channelNotFound(confChannel.content));
        }
        if (channel.type === "voice"){
            return msg.edit(message.language.configjoin.errors.channelNotFound(confChannel.content));
        }
        
        if(!channel) return msg.edit(message.language.configjoin.errors.channelNotFound(confChannel.content));
        
    
        
        collected.first().delete();

        msg.edit(message.language.configjoin.success());

        let embed = new Discord.MessageEmbed()
            .setTitle(message.language.configjoin.title())
            .addField(message.language.configjoin.fields.message(), confMessage)
            .addField(message.language.configjoin.fields.channel(), channel)
            .addField(message.language.configjoin.fields.testIt(), message.language.configjoin.fields.cmd(data.guild.prefix))
            .setThumbnail(message.author.avatarURL())
            .setColor(data.color)
            .setFooter(data.footer);
        message.channel.send(embed);

        data.guild.join = { enabled: true, message: confMessage, channel: channel.id };
        data.guild.markModified("join");
        await data.guild.save();
    

    }
}

module.exports = ConfigJoin;