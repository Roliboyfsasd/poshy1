module.exports = (client) => {
  const channelId = '901545015069782110' // welcome channel
  const targetChannelId = '901575039978176693' // rules and info

  client.on('guildMemberAdd', (member) => {
    const message = `Üdv itt <@${
      member.id
    }> a szerveren! Nézd meg ezt! ${member.guild.channels.cache
      .get(targetChannelId)
      .toString()}`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
  })
}