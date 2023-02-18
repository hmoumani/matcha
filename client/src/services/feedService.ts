import apiClient from '@/modules/apiClient';
import app from '@/main';
import EVENTS from '../../../common/enums/events';

const { USER_LIKE_EVENT, USER_DIS_LIKE_EVENT } = EVENTS;

const getNewProfiles = () => apiClient.get('feed/profiles');
const likeUser = likedUserId => {
	const socket = app.config.globalProperties.$socket;
	socket.emit(USER_LIKE_EVENT, likedUserId);
};

const unLikeUser = userId => {
	const socket = app.config.globalProperties.$socket;
	socket.emit(USER_DIS_LIKE_EVENT, userId);
};

export default {
	likeUser,
	unLikeUser,
	getNewProfiles,
};
