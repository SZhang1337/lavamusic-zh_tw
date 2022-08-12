const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    category: "Config",
    description: " Toggle DJ mode",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });

        if(!data) return message.reply({embeds:[new EmbedBuilder().setDescription(`此伺服器尚未設置DJ`).setColor(client.embedColor)]})

        let mode = false;
        if(!data.Mode)mode = true;
        data.Mode = mode;
        await data.save();
        if(mode) {
            await message.reply({embeds: [new EmbedBuilder().setDescription(`DJ模式已開啟`).setColor(client.embedColor)]})
        } else {
           return await message.reply({embeds: [new EmbedBuilder().setDescription(`DJ模式已關閉`).setColor(client.embedColor)]})
        }
    }
}
