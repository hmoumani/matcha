import apiClient from '@/modules/apiClient';
import io from 'socket.io-client';

export const setupUserGateway = async () => {
	const response = await apiClient.get('/auth/getUserToken');
	const token = response.data.message.token;
	const socket = io(`http://localhost:3000?token=${token}`);
	socket.on('connect', () => {
		console.log('Connected to the socket');
	});
	socket.on('disconnect', () => {
		console.log('Disconnected from the socket');
	});
	socket.on('chat message', msg => {
		console.log('Received message: ', msg);
	});
};
