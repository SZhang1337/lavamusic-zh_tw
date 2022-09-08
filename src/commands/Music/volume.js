const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["v", "vol"],
    category: "Music",
    description: "Change volume of currently playing music",
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
		
		const volumeEmoji = client.emoji.volumehigh;

		if (!args.length) {
			let thing = new EmbedBuilder()
			.setColor(client.embedColor)
			.setTimestamp()
			.setDescription(`${volumeEmoji} 現在音量為: **${player.volume}%**`)
			return message.reply({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 100) { 
			let thing = new EmbedBuilder()
                .setColor("Red")
				.setDescription(`Usage: ${prefix}volume <Number of volume between 0 - 100>`)
            return message.reply({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = client.emoji.volumehigh;
			let thing = new EmbedBuilder()
				.setColor(client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} 音量已調整至: **${volume}%**`)
		  return message.reply({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new EmbedBuilder()
				.setColor(client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} 音量已調整至: **${volume}%**`)
		  return message.reply({embeds: [thing]});
		} else {
			let thing = new EmbedBuilder()
				.setColor(client.embedColor)
				.setTimestamp()
				.setDescription(`${volumeEmoji} 音量已調整至o: **${volume}%**`)
			return message.reply({embeds: [thing]});
		}
		
 	}
};
