// Routes
const API_PREFIX = '/api/v1';
import { AuthRoutes } from '../components/Auth/auth.module';
import { UserRoutes } from '../components/User/user.module';

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/user',
    route: UserRoutes
  }
];

export default (app) => {
  routes.forEach((route) => {
    app.use(API_PREFIX + route.path, route.route);
  });
};
