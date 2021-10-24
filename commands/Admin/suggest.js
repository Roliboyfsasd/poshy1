const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
  name: "suggest",
  category:"ötlet",
  
  run: async (client, message, args) => {
   
  let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Adj meg valami ötletet.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Státusz: Elfogadásra vár!")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`<:Yes:900091146162827315>  | Az ötleted el lett küldve ide, <#${channel}>\n\nFontos: Te elfogadtad a FreshJS Ötlet Rendszer szabályát(privát üzenetben értesítünk róla!)!`)
       .setColor("00FFFF")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react('<:Yes:900091146162827315>')
    await msgEmbed.react('<:No:900091087396425768> ')
  }
}