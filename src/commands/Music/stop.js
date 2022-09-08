const { EmbedBuilder } = require("discord.js");

module.exports = {
  	name: "stop",
    category: "Music",
    description: "Stops the music",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute: async (message, args, client, prefix) => {
  
        const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription("沒有歌曲正在播放");
            return message.reply({embeds: [thing]});
        }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();

        const emojistop = client.emoji.stop;

		    let thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`${emojistop} 已停止播放`)
        message.reply({embeds: [thing]});
	
  	}
};
