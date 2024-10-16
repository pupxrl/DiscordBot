const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  PermissionsBitField,
  ButtonStyle,
  ChannelType,
} = require("discord.js");

const config = require("../config.json");

const superagent = require("superagent");

module.exports = async (client, message) => {
  if (message.channel.type === ChannelType.DM) return;
  if (message.author.bot) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  if (!message.content.startsWith(config.prefix)) return;

  switch (args[0]) {
    case "help": // help command, displays information about bot commands
      const helpRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("gotopage2")
          .setLabel("Next Page")
          .setStyle(ButtonStyle.Secondary)
      );
      const help1 = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle("Help Menu")
        .setDescription("-# Use buttons to navigate the help menu");
      message.channel.send({ embeds: [help1], components: [helpRow] });
      break;

    case "serverinfo": // server information command
      let owner = message.guild.members.cache.get(message.guild.ownerId);
      const serverinfoembed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${message.guild.name}`)
        .setThumbnail(
          `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=3072`
        )
        .addFields(
          {
            name: "**Total Members**",
            value: `\`\`\`${message.guild.memberCount}\`\`\``,
            inline: true,
          },
          {
            name: "**Total Roles**",
            value: `\`\`\`${message.guild.roles.cache.size}\`\`\``,
            inline: true,
          },
          {
            name: "**Total Channels**",
            value: `\`\`\`${message.guild.channels.cache.size}\`\`\``,
            inline: true,
          },
          {
            name: "**** ****",
            value: `\`\`\`diff\n-Server Created:\n${message.guild.createdAt}\`\`\``,
            inline: true,
          },
          {
            name: "**Server Picture**",
            value: `[Picture URL](https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=3072)`,
            inline: true,
          },
          {
            name: "**Vanity URL**",
            value: `https://discord.gg/${message.guild.vanityURLCode}`,
            inline: true,
          },
          {
            name: "**Current Location**",
            value: `${message.guild.region}`,
            inline: true,
          },
          {
            name: "**Verification Level**",
            value: `${message.guild.verificationLevel}`,
            inline: true,
          },
          { name: "**Guild Owner**", value: `${owner}`, inline: true },
          {
            name: "**Guild ID**",
            value: `\`\`\`${message.guild.id}\`\`\``,
            inline: true,
          }
        )
        .setImage(
          `https://cdn.discordapp.com/splashes/${message.guild.id}/${message.guild.splash}?size=3072`
        );
      message.channel.send({ embeds: [serverinfoembed] });
      break;

    case "ban": // ban member command by @member
      if (
        message.member.permissions.has(PermissionsBitField.Flags.BanMembers)
      ) {
        const target = message.mentions.members.first();
        if (!target) {
          return message.channel.send(
            "You have to mention a user to ban them."
          );
        }

        if (!target.bannable) {
          return message.channel.send("I cannot ban this user.");
        }

        target.ban();

        return message.channel.send(`${target.user.tag} was banned.`);
      } else {
        message.channel.send(
          `${message.author} You do not have the permission \`ban members\` to use this command.`
        );
      }
      break;

    case "kick": // kick member command by @member
      if (
        message.member.permissions.has(PermissionsBitField.Flags.KickMembers)
      ) {
        const target = message.mentions.members.first();
        if (!target) {
          return message.channel.send(
            "You have to mention a user to kick them."
          );
        }

        if (!target.kickable) {
          return message.channel.send("I cannot kick this user.");
        }

        target.kick();

        return message.channel.send(`${target.user.tag} was kicked.`);
      } else {
        message.channel.send(
          `${message.author} You do not have the permission \`kick members\` to use this command.`
        );
      }
      break;

    case "roll": // random game die command
      let rollnumber = [
        `:game_die: ${message.author.username} rolled 1`,
        `:game_die: ${message.author.username} rolled 2`,
        `:game_die: ${message.author.username} rolled 3`,
        `:game_die: ${message.author.username} rolled 4`,
        `:game_die: ${message.author.username} rolled 5`,
        `:game_die: ${message.author.username} rolled 6`,
      ];
      const rollembed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${rollnumber[~~(Math.random() * rollnumber.length)]}`);
      message.channel.send({ embeds: [rollembed] });
      break;

    case "userinfo":
      var person = message.mentions.users.first();
      var member = message.guild.members.cache.get(person.id);
      if (!person)
        return message.channel.send(
          "You need to mention someone to display user info"
        );
      if (!member)
        return message.channel.send(
          "You need to mention someone to display user info"
        );

      const userinfoembed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${person.username}'s info`)
        .setThumbnail(`${person.displayAvatarURL({ dynamic: true })}`)
        .addFields(
          { name: "**ID**", value: `\`\`\`${person.id}\`\`\``, inline: true },
          {
            name: "**Username**",
            value: `\`\`\`${person.username}\`\`\``,
            inline: true,
          },
          {
            name: "**Tag**",
            value: `\`\`\`#${person.discriminator}\`\`\``,
            inline: true,
          },
          { name: "**Bot?**", value: `${person.bot}`, inline: true },
          {
            name: "**Avatar**",
            value: `[Avatar URL](${person.displayAvatarURL({
              dynamic: true,
            })})`,
            inline: true,
          },
          {
            name: "**** ****",
            value: `\`\`\`diff\n-User Created:\n${person.createdAt}\`\`\``,
            inline: true,
          },
          {
            name: "**** ****",
            value: `\`\`\`diff\n-User Joined:\n${member.joinedAt}\`\`\``,
            inline: true,
          },
          {
            name: "**Nickname**",
            value: `\`\`\`${person.nickname}\`\`\``,
            inline: true,
          },
          {
            name: "**Status**",
            value: `\`\`\`${member.presence.status} \`\`\``,
            inline: true,
          }
        );
      message.channel.send({ embeds: [userinfoembed] });
      break;

    case "poke":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to poke them");
      var { body } = await superagent.get("https://nekos.life/api/v2/img/poke");

      const poke = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} poked ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [poke] });
      break;

    case "pat":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to poke them");
      var { body } = await superagent.get("https://nekos.life/api/v2/img/pat");

      const pat = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} gave head pats to ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [pat] });
      break;

    case "hug":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to hug them");
      var { body } = await superagent.get("https://nekos.life/api/hug");

      const hug = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} hugged ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);

      message.channel.send({ embeds: [hug] });
      break;

    case "cuddle":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to cuddle them");
      var { body } = await superagent.get("https://nekos.life/api/hug");

      const cuddle = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} cuddled ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [cuddle] });
      break;

    case "slap":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to slap them.");
      var { body } = await superagent.get("https://nekos.life/api/v2/img/slap");

      const slap = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} slapped ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [slap] });
      break;

    case "tickle":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to tickle them");
      var { body } = await superagent.get(
        "https://nekos.life/api/v2/img/tickle"
      );

      const tickle = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} tickled ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [tickle] });
      break;

    case "feed":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to feed them");
      var { body } = await superagent.get("https://nekos.life/api/v2/img/feed");

      const feed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} fed ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [feed] });
      break;

    case "kiss":
      if (!message.mentions.users.first())
        return message.reply("You need to mention someone to kiss them");
      var { body } = await superagent.get("https://nekos.life/api/kiss");

      const kiss = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(
          `${message.author.username} kissed ${
            message.mentions.users.first().username
          }`
        )
        .setImage(body.url);
      message.channel.send({ embeds: [kiss] });
      break;
  }
};
