const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns", "rsetwarns"],
  category: "Mod",
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Yopu should have admin perms to use this command"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention the person whose warning you want to reset");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Nem tudsz BOTOT Warnolni!");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Nem tudod a saját warnodat/warnjaidat resetelni!");
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} nincsenek warnjaid!`);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `Minden warnt töröltél  ${message.author.username} tőle ${message.guild.name}`
    );
    await message.channel.send(
      `Minden warn törölve! ${message.mentions.users.first().username}`
    );
  }
};