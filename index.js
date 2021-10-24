const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const math = require("mathjs");
const ms = require('ms');
const { parse } = require("twemoji-parser");
const fs = require("fs");
const ascii = require("ascii-table");
const bot = new Discord.Client({disableEveryone: true});
const { Console, clear } = require('console');
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
const moment = require('moment');
const os = require('os');
const axios = require('axios');
const db = require('quick.db');
const embed = new Discord.MessageEmbed()
const path = require("path");
let cpuStat = require("cpu-stat")
const Enmap = require("enmap")                 
const canvacord = require("canvacord")         




//////////////////////////////////////////////////////////
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);
});


////////

let botname = "LooseBoy"

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: ,",
        "Készítő: Roli, Synoox",
        ",help",
        ",ban",
        ",mute",
        ",setreport",
        ",report",
        ",setwelcome",
        ",supportszerver",
        ",botinfo",
        ",botinfo",
        ",ping",
        ",uptime",
        ",add-these",
        ",unban",
        ",warn",
        ",poll",
        ",ranginfo",
        ",avatar",
        ",embedsay",
        ",lockall",
        ",meme",
        ",slowmode",
        ",resetwarns",
        ",jail",
        ",tempmute",
        ",unmute",
        ",setsuggest",
        ",suggest",
        ",sreply",
        ",kick",
        ",jail",
        ",servercount",
        ",add",
        ",gban",
        `${bot.guilds.cache.size} Szerver`,
    ]
    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})


  bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix; 






if (message.content.match(new RegExp(`^<@!?${bot.user.id}>`))) {
    let bpingembed = new Discord.MessageEmbed()
    .setDescription("**A Bot Prefixe : ,**")
    .setColor("RANDOM")
    message.channel.send(bpingembed)
  }


if(message.content.startsWith(',btc')){
    const CoinGecko = require('coingecko-api');
    const CoinGeckobot = new CoinGecko();
    let data = await CoinGeckobot.simple.price({
        ids: ['bitcoin'],
        vs_currencies: ['huf', 'usd'],
    });
    console.log(data)
    let btcEmbed = new Discord.MessageEmbed()
    .setTitle("BitCoin lekérő parancs!")
    .setDescription(`Bitcoin Jelenlegi Árfolyam`)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    .addField("**Bitcoin jelenlegi árfolyama: " + data.data.bitcoin.huf + " HUF**", `Parancsot lekérte: <@${message.author.id}>`)
    .setDescription("Te is használhatod a parancsot, használat: ,btc")
    

    message.channel.send(btcEmbed);
    
}

if(cmd === `${prefix}servercount`){
  let scountembed = new Discord.MessageEmbed()

  .setTitle("Szerverek!")
  .setDescription(`${bot.guilds.cache.size} Szerver`)
  message.channel.send(scountembed)
}

 if(cmd === `${prefix}clear`){
  //üzenet törlése
  message.delete();
  if(message.member.hasPermission("MANAGE_MESSAGES")){
    //rang
      if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
    //meddig lehet törölni
          if(args[0] && isNaN(args[0]) && args [0] <=100 || 0 < args[0] && args[0] < 101){
    //üzenet
              message.channel.send(`Törölve lett: ${Math.round(args[0])} üzenet!`)
              message.channel.bulkDelete(Math.round(args[0]))
    //használat
          } else {
              message.re
              ply(`Használat: ${prefix}clear <1-100>`)
          }
          //ha a botnak nincs rangja
      } else message.reply("A Poshy-nak adminnaknak kell lennie a szervren, hogy működjön ez a parancs!")
  //ha az embernek nincs joga
  } else message.reply("Ehhez a parancshoz nincs jogod")
}

//Note that you need the Node module installed!
  

  


  bot.on('guildMemberAdd', member => {
    console.log('User @' + member.user.tag + ' belépett!');
    var role = member.guild.roles.cache.find(role => role.name == "『🌊』Tag")
    member.roles.add(role);
});
      
      if(cmd === `${prefix}help`){
         let helpembed = new Discord.MessageEmbed()
         message.author.send("🤖**Help commandok:** `botinfo`, `ping`, `uptime`, `userinfo`, `invite`\n**🔨Moderátori parancsok:** `add-these`, `szavazas`,`ban`, `announce`, `give-role`, `kick`, `lockall`, `ranginfo`, `resetwarns`,`setmodlog`, `total-bans`, `unban` , `warnings`\n**🛠Developer Commandok:**`Fejlesztés alatt`\nFun: `Meme`, `Avatar`, `Hack`, `8ball`\n**Szerver Kezelős:**`setwelcome`\n**Ticket parancsok:** `new`, `add`, `close`, `delete`, `open`, `remove`, `transcript`\n**Report parancsok:**`setreport`, `report`\n**Ötlet parancsok:**`setsuggest`, `suggest`, `sreply`")
       message.channel.send(helpembed)                  
     }
      
       if(cmd === `${prefix}help`){
        let helpembed2 = new Discord.MessageEmbed()
        .setTitle("Help Menü!")
        .addField("**A Parancsokat elküldtem, PRIVÁTBAN!**", "Ha nem kapnád meg, nyiss ticketet/ csatlakozz a support szerveremre!")
        .setTitle(`Kattints ide, hogy belépj a support szerveremre!`)
    .setURL("https://discord.gg/JFX3GZwhpD")
        .setDescription("Köszönöm, hogy lekérted a help menüt!")
        message.channel.send(helpembed2)
     }
if(cmd === `${prefix}invite`){
    let inviteembed = new Discord.MessageEmbed()
    .setTitle(`Katt ide, hogy meghívd a botot!`)
    .setURL("https://discord.com/api/oauth2/authorize?bot_id=901521890030530610&permissions=8&scope=bot")
    .setColor("RED")
    message.channel.send(inviteembed)
}

if(cmd === `${prefix}supportszerver`){
  let spembed = new Discord.MessageEmbed()
  .setTitle("Katt ide, hogy csatlakozz!")
  .setColor("RANDOM")
  .setURL("https://discord.gg/JFX3GZwhpD")
  message.channel.send(spembed)
}

if(cmd === `${prefix}ss`){
  let spembed = new Discord.MessageEmbed()
  .setTitle("Katt ide, hogy csatlakozz!")
  .setColor("RANDOM")
  .setURL("https://discord.gg/JFX3GZwhpD")
  message.channel.send(spembed)
}


     if(cmd === `${prefix}poll`){
        await message.delete()
        if(args[0]){
            let he_embed = new Discord.MessageEmbed()
                .setDescription(args.join(" "))
                .setColor("RANDOM")
                .setTimestamp(message.createdAt)
                .setFooter(bot.user.username)
    
                message.channel.send(he_embed).then(async msg => {
                    await msg.react("✅")
                    await msg.react("❌")
                })
        } else {
            message.reply("Kérlek add meg a szavazást!")
        }
    }


     if(cmd === `${prefix}ban`) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let rawreason = args[2];
        let bantime = args[1];
        let reason = args.slice(2).join(' ')
        if (!message.member.hasPermission("BAN_MEMBERS"))                   return message.reply("HIBA! **Nincs jogod ehhez a parancshoz! Szükséges jog:** `Tagok kitiltása`")
        if(!args[0] || !args[1] || !args[2] || isNaN(bantime)) return message.reply("HIBA! **Helyes használat: {prefix}ban <@felhasználó> <indok>**");
        if (user.hasPermission("BAN_MEMBERS") || user.hasPermission("ADMINISTRATOR")) return message.reply("HIBA! **Magaddal egyen rangú tagot, vagy nagyobbat nem bannolhatsz ki!**");
        if(user.ban({reason: reason})) {
            message.reply("**Sikeresen kitiltottad a következő felhasználót:** (" + user.user.tag + ")")
        } else {
            message.reply("HIBA! **Nincs jogom bannolni ezt az embert.**");
        }
    }  
       if(cmd === `${prefix}8ball`){
            let eballembed = new Discord.MessageEmbed() 
            if(!args[0]) return message.reply("Tegyél fel egy kérdést ")
            let result = Math.floor((Math.random() * valaszok.length));
            let kerdes = args.slice().join(" ");
            let valaszok = ["Igen", "Később", "Nem", "Nem tudom", "Talán"]
            .setAuthor(`🎱 ${message.author.username}`)
        .setColor("#ff1800")
        .addField("Kérdés", question)
        .addField("Válasz", replies[result])
        .setDescription(message.author.displayAvatarURL())
     }
      
      

if(cmd === `${prefix}createrole`){
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
        if(message.member.hasPermission("MANAGE_ROLES")){
            if(args[0]){
                message.guild.roles.create({
                    data: {
                        "name": args[0],
                    }
                }).then(message.reply(`${message.author.tag} létrehozta: ${args[0]} nevű rangot!`))

            } else message.reply(`Használat: ${prefix}createrole <rang neve>`)

        } else message.reply("Ehhez a parancshoz nincs jogod! A következő jog kell hozzá: **Szerepek Kezelése**")
    } else message.reply("A botnak nincsen administrator joga! Kérlek adj neki olyan jogosultságot.")

"a"

if(cmd === `${prefix}szavazás`){
    if(args[0]){
        let he_embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag + `| Szavazást indított!`)
            .setDescription(args.join(" "))
            .setColor("RANDOM")
            .setTimestamp(message.createdAt)
            .setFooter(bot.user.username)

            message.channel.send(he_embed).then(async msg => {
                await msg.react("✅")
                await msg.react("❌")
            })
    } else {
        message.reply("Kérlek add meg a szavazást!")
    }
}
const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(cmd === `${prefix}ticket-setup`) {
        // ticket-setup #channel

        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Usage: `-ticket-setup #channel`");

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React to open a ticket!")
            .setFooter("Ticket System")
            .setColor("00ff00")
        );

        sent.react('🎫');
        settings.set(`${message.guild.id}-ticket`, sent.id);

        message.channel.send("Ticket System Setup Done!")
    }

    if(command == "close") {
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.delete();
    }
;
bot.on('messageReactionAdd', async (reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    if(user.bot) return;

    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

    if(!ticketid) return;

    if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);

        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00"))
        })
    }
});


}})
bot.login(process.env.BOT_TOKEN);
