import { Methods } from '../enums/methods';
import { CONTROLLER_ROUTES } from '../tokens';
import { Method } from '../types/method';
import { ProtonRoute } from '../types/proton-route';

function Route(method: Method, path?: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const routes: ProtonRoute[] =
      Reflect.getMetadata(CONTROLLER_ROUTES, target) || [];

    routes.push({
      path: path && !path.startsWith('/') ? `/${path}` : path || '',
      method,
      propertyKey
    });

    Reflect.defineMetadata(CONTROLLER_ROUTES, routes, target);
  };
}

export function Get(path?: string): MethodDecorator {
  return Route(Methods.GET, path);
}

export function Post(path?: string): MethodDecorator {
  return Route(Methods.POST, path);
}

export function Put(path?: string): MethodDecorator {
  return Route(Methods.PUT, path);
}

export function Delete(path?: string): MethodDecorator {
  return Route(Methods.DELETE, path);
}

export function Patch(path?: string): MethodDecorator {
  return Route(Methods.PATCH, path);
}
