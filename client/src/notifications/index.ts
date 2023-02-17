import app from '@/main';
import EVENTS from '../../../common/enums/events';

const { USER_LIKE_EVENT, USER_DIS_LIKE_EVENT, USER_MATCH_EVENT } = EVENTS;

const handleUserLikeEvent = data => {
	console.log({ data });
};

const handleUserDisLikeEvent = data => {
	console.log({ data });
};

const handleUserMatchesEvent = data => {
	console.log({ data });
};

export const listenForEvents = () => {
	const socket = app.config.globalProperties.$socket;

	if (!socket) {
		return;
	}

	socket.on(USER_DIS_LIKE_EVENT, handleUserLikeEvent);
	socket.on(USER_LIKE_EVENT, handleUserDisLikeEvent);
	socket.on(USER_MATCH_EVENT, handleUserMatchesEvent);
};