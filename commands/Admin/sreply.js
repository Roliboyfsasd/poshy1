const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sreply",
  category: "ötlet",
  run: async (client, message, args) => {
    
let channel = await db.fetch(`suggestion_${message.guild.id}`);
if (channel === null) return;
     
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("Nincs jogod!");
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`<:brothey_iksz:888811017306513428>    | Nem hiszem hogy ez egy **üzenet id**!`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`<:brothey_iksz:888811017306513428>  | Elfelejtetted megadni az **üzenet id-t**!`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`<:brothey_iksz:888811017306513428> | Elfelejtetted megadni a választ!`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
      .setDescription(`<:Yes:900091146162827315>  | Sikeresen **válaszoltál az üzenetre/ötletre**`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
      .setDescription(`<:brothey_iksz:888811017306513428>   | **Nem találok semmilyen féle "ötlet" csatornát!**`)
      .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
      .setDescription(`<:brothey_iksz:888811017306513428>   | **Nincs semmilyen üzenet ezzel az ID-val!**`)
      .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`<:brothey_iksz:888811017306513428>   | **Nincs üzenet ezzel az ID-val**!`)
      .setColor("FF2052")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("BLUE")
      .addField(`Válasz tőle: ${message.author.tag}`, replyQuery)
      .setFooter("Státusz: válaszolva!")
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`Válasz érkezett az ötletedre! <:brothey_pipa:888811038206742569> . **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("BLUE")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}