const { Client, GatewayIntentBits, Partials, Options } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
  ],
  makeCache: Options.cacheWithLimits({
    DMMessageManager: 200,
    GuildMessageManager: 200,
  }),
});

const config = require("./config.json");

const path = require("path");

// requiring file system module
const fs = require("fs");

// Load event handlers from the "events" directory
const eventsPath = path.join(__dirname, "./events");
fs.readdir(eventsPath, (err, files) => {
  if (err) console.error("Error reading events directory:", err);
  files.forEach((file) => {
    if (file.endsWith(".js")) {
      const event = require(path.join(eventsPath, file));
      const eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    }
  });
});

client.login(config.token);
