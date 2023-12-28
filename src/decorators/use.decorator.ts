import { container } from 'tsyringe';

export function Use(token: Function | string): any {
  return function (target: any, propertyKey: string | symbol) {
    const dependency: any = container.resolve(
      typeof token === 'string' ? token : token.name
    );

    target[propertyKey] = dependency;

    return target;
  };
}
