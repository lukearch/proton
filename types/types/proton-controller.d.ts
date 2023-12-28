import { ProtonRoute } from './proton-route';
export interface ProtonController {
    path: string;
    routes: ProtonRoute[];
}
