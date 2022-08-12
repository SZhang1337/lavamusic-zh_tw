const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/prefix.js");
module.exports = {
  name: "setprefix",
  category: "Config",
  description: "Set a custom Prefix",
  args: false,
  usage: "",
  aliases: ["prefix"],
  userPerms: ['ManageGuild'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    const data = await db.findOne({ Guild: message.guildId });
    const pre = await args.join(" ")
    if (!pre[0]) {
      const embed = new EmbedBuilder()
        .setDescription("請給予您想設置的新參數!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (pre[1]) {
      const embed = new EmbedBuilder()
        .setDescription("您不能設置兩個形式參數!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (pre[0].length > 3) {
      const embed = new EmbedBuilder()
        .setDescription("您無法設置超過三個參數!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (data) {
      data.oldPrefix = prefix;
      data.Prefix = pre;
      await data.save()
      const update = new EmbedBuilder()
        .setDescription(`您的參數已更改至 **${pre}**`)
        .setColor(client.embedColor)
        .setTimestamp()
      return message.reply({ embeds: [update] });
    } else {
      const newData = new db({
        Guild: message.guildId,
        Prefix: pre,
        oldPrefix: prefix
      });
      await newData.save()
      const embed = new EmbedBuilder()
        .setDescription(`伺服器自訂參數已更改至 **${pre}**`)
        .setColor(client.embedColor)
        .setTimestamp()
      return message.reply({ embeds: [embed] });

    }
  }
};
