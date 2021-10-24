const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        "**Nincs jogosultságod!** Szükséges Jog `Üzenetek kezelése`"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Adj meg egy tagot akit szeretnél warnolni | Helyes használat` warn @ember <indok>`"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("**Nem tudsz warnolni botokat!**");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Nem tudod warnolni magad!");
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "Te bolond, nem tudod warnilni a tulajdonost! -_-"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Adj meg egy indokot | Helyes használat: `-warn <@tag> [Indok]`"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `You have been warned in **${message.guild.name}** for ${reason}`
      );
      await message.channel.send(
        `Warnolva lettél **${
          message.mentions.users.first().username
        }** ezért ${reason}`
      );
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(` Warnolva lettél itt: **${message.guild.name}** ezért: ${reason}`);
      
      await message.channel.send(`Warnolva lettél **${message.mentions.users.first().username}** ezért ${reason}`);
      
      message.delete
      
    }
  }
};