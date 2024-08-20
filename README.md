# Discord Bot

A simple Discord bot built using Node.js and the Discord.js library.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: You need to have Node.js installed. Download it from [nodejs.org](https://nodejs.org/).
- **Git**: You need to have Git installed. Download it from [git-scm.com](https://git-scm.com/).

### Installing Node.js

1. Go to the [Node.js download page](https://nodejs.org/).
2. Download the LTS version for your operating system.
3. Follow the installation instructions for your OS.

### Installing Git

1. Go to the [Git download page](https://git-scm.com/downloads).
2. Download the version for your operating system.
3. Follow the installation instructions for your OS.

## Installation

Follow these steps to get the bot up and running:

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/pupxrl/DiscordBOt.git
cd discord-bot
```

### 2. Install Dependencies

Run the following command in the terminal to install the required Node.js libraries:

```bash
npm install
```

### 3. Configure the Bot

Create a `config.json` file in the root directory with the following content:

```json
{
  "prefix": "1",
  "token": "YOUR_BOT_TOKEN",
  "BotAuthor": "YOUR_USERNAME",
  "embedColor": "A7A7A7"
}
```

Replace the placeholders with your actual Discord bot token and other details:

- `prefix`: The prefix for your bot commands (e.g., `!`, `?`).
- `token`: Your bot's token from the Discord Developer Portal.
- `BotAuthor`: Your username.
- `embedColor`: The default embed color to use.

### 4. Run the Bot

To start the bot, run the following command:

```bash
node index.js
```

Alternatively, you can use [nodemon](https://www.npmjs.com/package/nodemon) to automatically restart the bot when files change:

```bash
npm install -g nodemon
nodemon index.js
```

## Usage

Once the bot is running, you can interact with it in your Discord server using the prefix you specified in `config.json`. For example, if your prefix is `!`, typing `!help` will trigger the help command.

## Contributing

If you want to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
