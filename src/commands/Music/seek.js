const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

module.exports = {
  	name: "seek",
  	aliases: [],
  	category: "Music",
  	description: "Seek the currently playing song",
  	args: true,
    usage: "<10s || 10m || 10h>",
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

        const time = ms(args[0])
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = client.emoji.forward;
        const emojirewind = client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new EmbedBuilder()
                    .setDescription(`${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
                return message.reply({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new EmbedBuilder()
                    .setDescription(`${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
          return message.reply({embeds: [thing]});
            }
        } else {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``);
            return message.reply({embeds: [thing]});
        }
	
    }
};
