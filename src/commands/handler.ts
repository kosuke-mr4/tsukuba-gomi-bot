import { COMMANDS } from "../constants/commands";

import { timeCommand } from "./time";
import { helpCommand } from "./help";
import { setupCommand } from "./setup";
import { showareaCommand } from "./showarea";
import { myareaCommand } from "./myarea";
import { debugCommand } from "./debug";

const commands = new Map();

commands.set(COMMANDS.TIME, timeCommand);
commands.set(COMMANDS.HELP, helpCommand);
commands.set(COMMANDS.SETUP, setupCommand);
commands.set(COMMANDS.SHOWAREA, showareaCommand);
commands.set(COMMANDS.MYAREA, myareaCommand);
commands.set(COMMANDS.DEBUG, debugCommand);

export { commands };
