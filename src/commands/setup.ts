import { Message } from "discord.js";
import * as ExcelJS from "exceljs";
import * as fs from "fs";
import * as path from "path";

import { GOMI_BASE_URL, GOMI_TAIL_URL } from "../constants/urls";

export const setupCommand = async (message: Message) => {
  await message.channel.send(
    "botをセットアップしています... 終了次第お知らせします。"
  );
  await getGomiData(message);
  await message.channel.send(
    'botのセットアップが完了しました。現在は対象エリアを "春日" にしています。他エリアを指定したい場合 !gomi setarea "対象エリア" で指定してください。エリアの名称がわからない場合、!gomi showarea の表示結果から確認してください'
  );
};

async function getGomiData(message: Message) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  let monthCount = month;
  while (true) {
    const response = await fetch(
      `${GOMI_BASE_URL}${year}${monthCount}${GOMI_TAIL_URL}`
    );
    if (!response.ok) {
      await message.channel.send(
        "データの取得に失敗しました、時間をおいて再度実行してください"
      );
      break;
    } else {
      await downloadAndSaveFile(
        response,
        path.join(__dirname, `../data/${year}${monthCount}.csv`)
      );
      monthCount++;
    }
  }
}

async function downloadAndSaveFile(
  response: Response,
  saveTo: string
): Promise<void> {
  const excelBuffer = await response.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(excelBuffer);

  const csvData = await workbook.csv.writeBuffer();

  fs.writeFileSync(saveTo, csvData.toString());
}
