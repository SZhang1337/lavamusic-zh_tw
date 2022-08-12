const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
    description: "Clear Queue",
    args: false,
    usage: "<Number of song in queue>",
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
                .setColor("RED")
                .setDescription("沒有任何歌曲正在撥放");
            return message.reply({ embeds: [thing] });
        }

        player.queue.clear();

        const emojieject = message.client.emoji.remove;

        let thing = new EmbedBuilder()
            .setColor(message.client.embedColor)
            .setTimestamp()
            .setDescription(`${emojieject} 已清除所有列表中的歌曲`)
        return message.reply({ embeds: [thing] });
    }
};
