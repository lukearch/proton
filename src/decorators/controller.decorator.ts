import { CONTROLLER_ROUTES } from '../tokens';
import { ProtonRoute } from '../types/proton-route';

export function Controller(path?: string): ClassDecorator {
  return function (target: any) {
    const routes: ProtonRoute[] =
      Reflect.getMetadata(CONTROLLER_ROUTES, target.prototype) || [];

    const controller = new target();

    routes.forEach((route) => {
      route.path = `${path && !path.startsWith('/') ? '/' : ''}${path}${
        route.path
      }`;

      route.action = controller[route.propertyKey].bind(controller);
    });

    Reflect.defineMetadata(CONTROLLER_ROUTES, routes, target.prototype);

    return target;
  };
}
