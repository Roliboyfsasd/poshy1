module.exports = (bot) => {
  const channelId = '901750638407450634'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Tagok: ${guild.memberCount.toLocaleString()}`)
  }

  bot.on('guildMemberAdd', (member) => updateMembers(member.guild))
  bot.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = bot.guilds.cache.get('901545015069782107')
  updateMembers(guild)
}