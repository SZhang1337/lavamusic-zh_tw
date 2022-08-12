const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    category: "Config",
    description: "Remove Dj Role",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        if (data) {
            await data.delete()
            return message.reply({ embeds: [new EmbedBuilder().setDescription(`成功移除所有DJ身分組`).setColor(client.embedColor)] })
        } else return message.reply({ embeds: [new EmbedBuilder().setDescription(`此群組尚未設置任何DJ!`).setColor(client.embedColor)] })

    }
}
