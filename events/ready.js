const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  console.log(`${client.user.username} logged in and ready!`);

  // setting bot activity
  client.user.setActivity({
    type: ActivityType.Custom,
    name: "Hello",
  });
};
