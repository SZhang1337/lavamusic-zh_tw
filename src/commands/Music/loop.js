const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ['l'],
    category: "Music",
    description: "Toggle music loop",
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
                .setDescription("沒有任何音樂正在撥放");
            return message.reply({ embeds: [thing] });
        }
        const emojiloop = message.client.emoji.loop;

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "開啟" : "關閉";
            let thing = new EmbedBuilder()
                .setColor(message.client.embedColor)
                .setTimestamp()
                .setDescription(`${emojiloop} 重播清單已 **${queueRepeat}**`)
            return message.reply({ embeds: [thing] });
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "開啟" : "關閉";
        let thing = new EmbedBuilder()
            .setColor(message.client.embedColor)
            .setTimestamp()
            .setDescription(`${emojiloop} 重播單曲已 **${trackRepeat}**`)
        return message.reply({ embeds: [thing] });
    }
};
