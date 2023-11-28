import { Message } from "discord.js";

export const myareaCommand = async (message: Message) => {
  // dotenvからMYAERAを取得
  const myarea = process.env.MYAREA;

  if (!myarea) {
    await message.channel.send(
      '地域が設定されていません、!gomi setarea "対象地域" で地域を指定してください。地域の名称がわからない場合、!gomi showarea の表示結果から確認してください'
    );
    return;
  } else {
    await message.channel.send(
      `現在の対象地域は ${myarea} です。他地域を指定したい場合 !gomi setarea "対象地域" で指定してください。地域の名称がわからない場合、!gomi showarea の表示結果から確認してください`
    );
  }
};
