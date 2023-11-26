import { GatewayIntentBits, Client, Partials, Message } from "discord.js";
import dotenv from "dotenv";

import { COMMAND_PREFIX } from "./constants/commands";
import { commands } from "./commands/handler";
import { notifyCommand } from "./commands/notify";

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
  notifyCommand(client, process.env.NOTIFY_CHANNEL_ID as string);
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  const args = message.content.split(" ");
  const command = args[0];
  const subCommand = args[1];

  if (command === COMMAND_PREFIX) {
    if (commands.has(subCommand)) {
      const commandToRun = commands.get(subCommand);
      await commandToRun(message);
    } else {
      console.log("command not found");
      await message.channel.send(
        "正しいコマンドではありません、`!help`でコマンド一覧を確認してください"
      );
    }
  }
});

client.login(process.env.TOKEN);
