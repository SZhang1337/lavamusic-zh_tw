const { EmbedBuilder } = require("discord.js");

module.exports = {
  	name: "shuffle",
    category: "Music",
    description: "Shuffle queue",
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
                .setDescription("沒有任何歌曲正在播放");
            return message.reply({embeds: [thing]});
        }
        player.queue.shuffle();
        
        const emojishuffle = client.emoji.shuffle;

        let thing = new EmbedBuilder()
            .setDescription(`${emojishuffle} Shuffled the queue`)
            .setColor(client.embedColor)
            .setTimestamp()
        return message.reply({embeds: [thing]}).catch(error => client.logger.log(error, "error"));
	
    }
};
