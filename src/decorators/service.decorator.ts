import { container } from 'tsyringe';

export function Service(): ClassDecorator {
  return function (target: any) {
    container.register(target.name, {
      useClass: target
    });
  };
}
