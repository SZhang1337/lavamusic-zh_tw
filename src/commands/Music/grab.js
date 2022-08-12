const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "grab",
    aliases: ["save"],
    category: "Music",
    description: "Grabs and sends you the Song that is playing at the Moment",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
            .setColor(0xFFC942)
            .setDescription("> 沒有任何歌曲正在撥放");
            return message.channel.send({embeds: [thing]});
        }

        const song = player.queue.current
        const total = song.duration;
        const current = player.position;

        const dmbut = new ButtonBuilder().setLabel("請查看您的私訊").setStyle(ButtonStyle.Link).setURL(`https://discord.com/users/${client.id}`)
        const row = new ActionRowBuilder().addComponents(dmbut)

        let dm = new EmbedBuilder()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL()})
        .setDescription(`:mailbox_with_mail: \`請查看您的私訊!\``)
        .setColor(client.embedColor)
        .setFooter({text: `請求者 ${message.author.tag}`})
        .setTimestamp()
        message.reply({embeds: [dm], components: [row]})
        
        const urlbutt = new ButtonBuilder().setLabel("Search").setStyle(ButtonStyle.Link).setURL(song.uri)
        const row2 = new ActionRowBuilder().addComponents(urlbutt)
        let embed = new EmbedBuilder()
            .setDescription(`**Song Details** \n\n > **__歌曲名稱__**: [${song.title}](${song.uri}) \n > **__歌曲長度__**: \`[${convertTime(song.duration)}]\` \n > **__播放歌曲者__**: [<@${song.requester.id}>] \n > **__歌曲儲存__**: [<@${message.author.id}>]`)
            .setThumbnail(song.displayThumbnail())
            .setColor(client.embedColor)
            .addFields([
                { name: "\u200b", value: `\`${convertTime(current)} / ${convertTime(total)}\`` }
            ])
         return message.author.send({embeds: [embed], components: [row2]}).catch(() => null);
            
    }
};
