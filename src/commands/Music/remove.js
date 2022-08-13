const { EmbedBuilder } = require("discord.js");

module.exports = {
  	name: "remove",
    category: "Music",
  	description: "Remove a song from the queue",
	args: true,
    usage: "<Number of song in queue>",
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
                .setDescription("沒有歌曲正在撥放");
            return message.reply({embeds: [thing]});
        }

    const position = (Number(args[0]) - 1);
       if (position > player.queue.size) {
        const number = (position + 1);
         let thing = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`沒有歌曲在第 ${number}.\n歌曲數目: ${player.queue.size}`);
            return message.reply({embeds: [thing]});
        }

    const song = player.queue[position]
		player.queue.remove(position);

		const emojieject = client.emoji.remove;

		let thing = new EmbedBuilder()
			.setColor(client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} 已移除\n[${song.title}](${song.uri})`)
		  return message.reply({embeds: [thing]});
	
    }
};
