import { Message } from "discord.js";

export const debugCommand = async (message: Message) => {
  await message.channel.send("this is debug command");
  // you can call this command by "!gomi debug"
};
