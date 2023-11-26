import { COMMANDS } from "../constants/commands";

import { timeCommand } from "./time";
import { helpCommand } from "./help";

const commands = new Map();

commands.set(COMMANDS.TIME, timeCommand);
commands.set(COMMANDS.HELP, helpCommand);

export { commands };
