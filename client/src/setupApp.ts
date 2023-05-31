import userToken from './helpers/userToken';
import socketIO from './plugins/socketIO';
import { router } from './router';
import { useUserStore } from './store/user';

const publicRoutes = ['/login', '/register'];

const inSentitiveComparaison = (str1, str2) =>
	str1.toLowerCase() === str2.toLowerCase();

const isPublicRoute = routePath =>
	publicRoutes.some(route => inSentitiveComparaison(route, routePath)) ||
	routePath.startsWith('/ResetPassword') || routePath.startsWith('/VerifyEmail');

const setupApp = async app => {
	// Get user profile

	//failed?
	// => /login
	// success?
	// => protected route?
	// ==> continue
	// => !protected route?
	// ==> redirect to Home

	const { getCurrentUser } = useUserStore();
	const currentRoute = window.location.pathname;

	try {
		await getCurrentUser();
	} catch (e) {
		if (!isPublicRoute(currentRoute))
			router.push('/login');
			return;
	}
	
	if (isPublicRoute(currentRoute)) {
		router.push({ name: 'home' });
	}
};

export default setupApp;
