import { Message } from "discord.js";

export const timeCommand = async (message: Message) => {
  const date = new Date();
  await message.channel.send(date.toLocaleString());
};
