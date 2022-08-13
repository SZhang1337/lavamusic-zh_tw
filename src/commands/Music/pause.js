const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the currently playing music",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
    
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription("沒有歌曲正在撥放");
            return message.reply({embeds: [thing]});
        }

        const emojipause = client.emoji.pause;

        if (player.paused) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`${emojipause} 音樂早已暫停`)
                .setTimestamp()
                return message.reply({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        let thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`${emojipause} **已暫停撥放**\n[${song.title}](${song.uri})`)
          return message.reply({embeds: [thing]});
	
    }
};
