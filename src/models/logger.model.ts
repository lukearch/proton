import cliColors from '../utils/cli-colors';
import getTimestamp from '../utils/get-timestamp';

export class ProtonLogger {
  private context: string;

  constructor(context?: string) {
    this.context = context || '';
  }

  private write(
    color: keyof typeof cliColors,
    type: string,
    message: string,
    context?: string,
    log: boolean = true
  ) {
    const logString = `[${cliColors[color](
      type.toUpperCase()
    )}] ${cliColors.gray(getTimestamp())} ${this.getContext(
      context
    )} ${cliColors[color](message)}`;

    if (log) {
      console.log(logString);
    }

    return logString;
  }

  public log(message: string, context?: string): void {
    this.write('white', 'log', message, context);
  }

  public error(message: string, stack?: string, context?: string): void {
    this.write('red', 'error', message, context);

    if (stack) {
      console.log(cliColors.white(stack || ''));
    }
  }

  public warn(message: string, context?: string): void {
    this.write('yellow', 'warn', message, context);
  }

  public debug(message: string, context?: string): void {
    this.write('purple', 'debug', message, context);
  }

  public question(message: string, context?: string): string {
    return this.write('cyan', 'question', message, context, false);
  }

  public getContext(context?: string): string {
    if (context) {
      return cliColors.green(`[${context}]`);
    } else if (this.context) {
      return cliColors.green(`[${this.context}]`);
    }

    return '';
  }
}
