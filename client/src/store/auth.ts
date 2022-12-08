import { defineStore } from 'pinia';
import { login, registerUser } from '../services/authService';

export const useAuthStore = () => {
	const router = useRouter();
	return defineStore('auth', ({
		state: () => ({
			user: null,
		}),
		actions: {
			logIn(username: string, password: string) {
				console.log(username, password);
				login(username, password);
			},
			async register(newUser){
				await registerUser(newUser).catch();
				router.push({ path:'/EmailSent' }); 
			}
		},
	}))()
};
