const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const config = require("../config.json");

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const args = [];
    interaction.options.array().map((x) => {
      if (x.value) args.push(x.value);
      if (x.name) args.push(x.name);
    });
  }

  const helpRow3 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("gotopage3")
      .setLabel("Next Page")
      .setStyle(ButtonStyle.Secondary)
  );

  const helpRow4 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("gotopage4")
      .setLabel("Next Page")
      .setStyle(ButtonStyle.Secondary)
  );

  if (interaction.isButton()) {
    if (interaction.customId === "gotopage2") {
      const help2 = new EmbedBuilder()
        .setColor(config.embedColor)
        .setAuthor({ name: "Help Menu" })
        .setTitle("Page 2 Miscellaneous")
        .setDescription(
          `\n${config.prefix}serverinfo\n${config.prefix}userinfo @user`
        );
      interaction.reply({
        embeds: [help2],
        components: [helpRow3],
        ephemeral: true,
      });
    } else if (interaction.customId === "gotopage3") {
      const help3 = new EmbedBuilder()
        .setColor(config.embedColor)
        .setAuthor({ name: "Help Menu" })
        .setTitle("Page 3 Fun")
        .setDescription(`\n${config.prefix}roll (rolls a dice)
                \n${config.prefix}poke @user
                \n${config.prefix}pat @user
                \n${config.prefix}hug @user
                \n${config.prefix}cuddle @user
                \n${config.prefix}slap @user
                \n${config.prefix}tickle @user
                \n${config.prefix}feed @user
                \n${config.prefix}kiss @user
                `);
      interaction.reply({
        embeds: [help3],
        components: [helpRow4],
        ephemeral: true,
      });
    } else if (interaction.customId === "gotopage4") {
      const help4 = new EmbedBuilder()
        .setColor(config.embedColor)
        .setAuthor({ name: "Help Menu" })
        .setTitle("Page 4 Moderation")
        .setDescription(
          `${config.prefix}ban @user (Permission needed: "Ban Members" needed) - Bans a member\n
              ${config.prefix}kick @user (Permission needed: "Kick Members" needed) - Kicks a member`
        );
      interaction.reply({ embeds: [help4], ephemeral: true });
    }
  }
};
