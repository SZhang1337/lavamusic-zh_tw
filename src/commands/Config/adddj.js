const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    category: "Config",
    description: "Set Dj Role",
    args: false,
    usage: "",
    aliases: ["adj"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.reply({ embeds: [new EmbedBuilder().setDescription(`請使用標註身分組來選擇! @role!`).setColor(client.embedColor)] })
        if (!data) {
           data = new db({
                Guild: message.guild.id,
                Roles: [role.id],
                Mode: true
            })
            await data.save();
            return await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`成功設置DJ身分組 ${role}.`).setColor(client.embedColor)] })
        } else {
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return message.reply({ embeds: [new EmbedBuilder().setDescription(`此身份組已在列表內`).setColor(client.embedColor)] })
            data.Roles.push(role.id);
            await data.save();
            return await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`成功新增DJ身分組 ${role}.`).setColor(client.embedColor)] })

        }
    }
}
