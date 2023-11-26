import { GatewayIntentBits, Client, Partials, Message } from "discord.js";
import dotenv from "dotenv";

import { COMMAND_PREFIX, COMMANDS } from "./constants/commands";
import { commands } from "./commands/handler";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.once("ready", () => {
  console.log("Ready!");
  if (client.user) {
    console.log(client.user.tag);
  }
  const notifyCommandToRun = commands.get(COMMANDS.NOTIFY);
  if (notifyCommandToRun) {
    notifyCommandToRun(client);
  }
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  const args = message.content.split(" ");
  const command = args[0];
  const subCommand = args[1];

  if (command === COMMAND_PREFIX && commands.has(subCommand)) {
    const commandToRun = commands.get(subCommand);
    await commandToRun(message);
  }
});

client.login(process.env.TOKEN);
