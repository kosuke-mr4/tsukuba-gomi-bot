import { Message } from "discord.js";

export const helpCommand = async (message: Message) => {
  const helpMessage: string = `
  このBotの使い方は以下の通りです。\n
    \`!gomi help\`: このメッセージを表示します。\n
    \`!gomi setup\`: Botをセットアップします。\n
    \`!gomi setarea {地域}\`: Botの対象地域を設定します。名称がわからない場合、\`!gomi showarea\` の表示結果から確認してください。例：\`!gomi setarea 春日\`\n
    \`!gomi myarea\`: 現在のBotの対象地域を表示します。\n
    \`!gomi showarea\`:  全てのBotの対象地域を表示します。\n
  `;
  await message.channel.send(helpMessage);
};
