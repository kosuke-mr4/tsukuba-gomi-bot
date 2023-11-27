import { COMMANDS } from "../constants/commands";

import { timeCommand } from "./time";
import { helpCommand } from "./help";
import { setupCommand } from "./setup";

const commands = new Map();

commands.set(COMMANDS.TIME, timeCommand);
commands.set(COMMANDS.HELP, helpCommand);
commands.set(COMMANDS.SETUP, setupCommand);

export { commands };
