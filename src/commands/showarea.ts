import { Message } from "discord.js";
import fs from "fs";

const { parse } = require("csv-parse/sync");

export const showareaCommand = async (message: Message) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const fileName = `src/data/${year}${month}.csv`;

  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      message.channel.send(
        "ファイルが存在しません。!gomi setup コマンドを実行してください。"
      );
    } else {
      const data = fs.readFileSync(fileName, "utf8");
      const rows = parse(data, { columns: true });
      const firstLineArray = rows.map((row: Record<string, string>) => {
        return row[Object.keys(row)[0]];
      });

      const targetmessage = firstLineArray.join(" , ");
      message.channel.send(targetmessage);
    }
  });
};
