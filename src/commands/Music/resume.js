const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "暫停當前的音樂",
    args: false,
    usage: "<Number of song in queue>",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription("沒有任何歌曲正在播放");
            return message.reply({embeds: [thing]});
        }

        const emojiresume = client.emoji.resume;

        if (!player.paused) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`${emojiresume} 此次播放已 **繼續播放**.`)
                .setTimestamp()
          return message.reply({embeds: [thing]});
        }

        player.pause(false);

        let thing = new EmbedBuilder()
            .setDescription(`${emojiresume} **繼續播放**\n[${song.title}](${song.uri})`)
            .setColor(client.embedColor)
            .setTimestamp()
        return message.reply({embeds: [thing]});
	
    }
};
