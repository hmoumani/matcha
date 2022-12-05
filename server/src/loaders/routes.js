// Routes
const API_PREFIX = '/api/v1';
import { AuthRoutes } from "../components/Auth/auth.module";

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  }
];

export default (app) => {
  routes.forEach((route) => {
    app.use(API_PREFIX + route.path, route.route);
  });
};
