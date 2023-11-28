import { Client, TextChannel } from "discord.js";
import fs from "fs";

const { parse } = require("csv-parse/sync");

export const notifyCommand = async (client: Client, channelId: string) => {
  const channel = client.channels.cache.get(channelId) as TextChannel;
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
    const todayGomi: string | undefined = getKeyForTodayDate(getMyAreaInfo());
    await channel.send(
      todayGomi ? `今日は ${todayGomi} の日です` : "今日はゴミ回収はありません"
    );
  } else {
    console.log("channel is null");
  }
}

// ex.
// {
//   '地区名１': '春日',
//   '備考': '西地区B\nかすが',
//   '燃やせるごみ': '2023/11/03,2023/11/07,2023/11/10,2023/11/14,2023/11/17,2023/11/21,2023/11/24,2023/11/28',
//   'びん': '2023/11/06,2023/11/20',
//   'スプレー容器': '2023/11/06,2023/11/20',
//   'ペットボトル': '2023/11/02,2023/11/16',
//   '燃やせないごみ': '2023/11/09,2023/11/23',
//   '古紙・古布': '2023/11/13,2023/11/27',
//   'プラスチック製容器包装': '2023/11/01,2023/11/08,2023/11/15,2023/11/22',
//   'かん': '2023/11/01,2023/11/15',
//   '粗大ごみ（予約制）': '2023/11/08,2023/11/22'
// }

function getKeyForTodayDate(map: Map<string, string>): string | undefined {
  const today = formatDate(new Date());

  for (const [key, value] of map.entries()) {
    if (value.includes(today)) {
      console.log(key);
      return key;
    }
  }
  return undefined;
}

function getMyAreaInfo(): Map<string, string> {
  const myarea = process.env.MYAREA;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const fileName = `src/data/${year}${month}.csv`;

  const data = fs.readFileSync(fileName, "utf8");
  const rows = parse(data, { columns: true });

  const targetRow = rows.find((row: Record<string, string>) => {
    return row[Object.keys(row)[0]] === myarea;
  });
  const map = new Map<string, string>(Object.entries(targetRow));

  return map;
}
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月は0から始まるため+1する
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}
