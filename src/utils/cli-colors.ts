export default {
  green: (message: string) => `\x1b[32m${message}\x1b[0m`,
  cyan: (message: string) => `\x1b[36m${message}\x1b[0m`,
  purple: (message: string) => `\x1b[35m${message}\x1b[0m`,
  pink: (message: string) => `\x1b[95m${message}\x1b[0m`,
  yellow: (message: string) => `\x1b[33m${message}\x1b[0m`,
  red: (message: string) => `\x1b[31m${message}\x1b[0m`,
  gray: (message: string) => `\x1b[90m${message}\x1b[0m`,
  white: (message: string) => `\x1b[37m${message}\x1b[0m`,
  bold: (message: string) => `\x1b[1m${message}\x1b[0m`,
  underline: (message: string) => `\x1b[4m${message}\x1b[0m`,
  italic: (message: string) => `\x1b[3m${message}\x1b[0m`
} as const;
