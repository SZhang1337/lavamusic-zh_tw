const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "lyrics",
  category: "Music",
  description: "Prints the lyrics of a song",
  userPrems: [],
  usage: "lyrics <song name>",
  player: true,
  args: true,
  dj: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  execute: async (message, args, client, prefix) => {
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription("🔎 **搜尋中...**"),
      ],
    });

    let player;
    if (client.manager) {
      player = client.manager.players.get(message.guild.id);
    } else {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("Lavalink node 尚未連線"),
        ],
      });
    }

    if (!args && !player) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("並未有任何歌曲正在撥放"),
        ],
      });
    }

    let search = args ? args : player.queue.current.title;
    // Lavalink api for lyrics
    let url = `https://api.darrennathanael.com/lyrics?song=${search}`;

    let lyrics = await fetch(url)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err.name;
      });
    if (!lyrics || lyrics.response !== 200 || lyrics === "FetchError") {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `❌ | 無法找到關於 ${search} 的歌詞!\n請確認您的字是否有誤`
            ),
        ],
      });
    }

    let text = lyrics.lyrics;
    let lyricsEmbed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`${lyrics.full_title}`)
      .setURL(lyrics.url)
      .setThumbnail(lyrics.thumbnail)
      .setDescription(text);

    if (text.length > 4096) {
      text = text.substring(0, 4090) + "[...]";
      lyricsEmbed
        .setDescription(text)
        .setFooter({ text: "斷尾了，太長了" });
    }

    return message.channel.send({ embeds: [lyricsEmbed] });
  },
};
