const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["j"],
  category: "Music",
  description: "Join voice channel",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    
    let player = message.client.manager.get(message.guildId);
        if(player && player.voiceChannel && player.state === "CONNECTED") {
            return await message.channel.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription( `我已經在 <#${player.voiceChannel}> 裡了!`)]})
        } else {
    if (!message.guild.members.me.permissions.has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])) return message.channel.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`我沒有足夠的權限來使用此指令! 煩請給我 \`連線\` 或 \`講話\`權限。`)]});

    const { channel } = message.member.voice;
   
    if (!message.guild.members.me.permissionsIn(channel).has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])) return message.channel.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`我沒有足夠的權限來進入語音頻道。 煩請給我 \`連線\` 以及 \`講話\`權限。`)]});
   
    const emojiJoin = message.client.emoji.join;

     player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 80,
        selfDeafen: true,
      }) 
      if(player && player.state !== "CONNECTED") player.connect();

      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`${emojiJoin} **已加入語音頻道**\n已加入 <#${channel.id}> 並綁定頻道至 <#${message.channel.id}>`)
      return message.reply({ embeds: [thing] });

    };
  }
};
