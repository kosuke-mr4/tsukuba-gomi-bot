import { Client, TextChannel } from "discord.js";

export const notifyCommand = async (client: Client) => {
  const channel = client.channels.cache.get("channelId") as TextChannel;
  const now = new Date();
  let millisTill8 = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8, // 8時に通知
    0,
    0,
    0
  ).getTime();
  if (millisTill8 < now.getTime()) {
    millisTill8 += 86400000;
  }
  setTimeout(function () {
    sendNotification(channel);
  }, millisTill8 - now.getTime());
};

async function sendNotification(channel: TextChannel) {
  if (channel) {
    await channel.send("ゴミの日だよ"); // todo:ゴミの内容をfetch
  } else {
    console.log("channel is null");
  }
}
