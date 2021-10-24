const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
  name: "report",
  category:"report",
  
  run: async (client, message, args) => {
   
  let channel = await db.fetch(`report_${message.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Adj meg egy embert.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setTitle("Report!")
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Státusz: Elfogadásra vár!")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`<:Yes:900091146162827315>  | Az reportod el lett küldve ide, <#${channel}>\n\nFontos: Te elfogadtad a DeveloperBOT Report Rendszer szabályát(privát üzenetben értesítünk róla!)!`)
       .setColor("00FFFF")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react('<:brothey_pipa:888811038206742569> ')
    await msgEmbed.react('<:brothey_iksz:888811017306513428> ')
  }
}
