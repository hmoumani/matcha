import app from '@/main';
import EVENTS from '../../../common/enums/events';
import { useNotificationStore } from '@/store/notification'
import { storeToRefs } from 'pinia';
import apiClient from '../modules/apiClient';

const getNotifications = async () => {
	const { data : { message: data } } = await apiClient.get('/feed/notifications');
	return data;
};

const { USER_LIKE_EVENT, USER_DIS_LIKE_EVENT, USER_MATCH_EVENT, USER_MESSAGE_NOTIFICATION_EVENT, USER_VISIT_EVENT } = EVENTS;

const pushToNotificationsList = data => {
	const {notificationList} = storeToRefs(useNotificationStore());
	notificationList.value.unshift({
		name: data.title,
		description: data.msg,
		userId: data.userId,
		icon: data.avatar,
		seen: data.seen
	});
};

const handleUserLikeEvent = data => {
	pushToNotificationsList({...data, seen: false});
};

const handleUserDisLikeEvent = data => {
	pushToNotificationsList({...data, seen: false});
};

const handleUserMatchesEvent = data => {
	pushToNotificationsList({...data, seen: false});
};

const handleMessageNotificationEvent = data => {
	pushToNotificationsList({...data, seen: false});
};

const handleUserVisitsEvent = data => {
	pushToNotificationsList({...data, seen: false});
};

export const listenForEvents = async () => {
	const socket = app.config.globalProperties.$socket;
	if (!socket) {
		return;
	}


	const notifications = await getNotifications();
	notifications.forEach(element => pushToNotificationsList(
		{
			title: element.type,
			msg: element.content,
			avatar: element.avatar,
			seen: element.seen,
			userId: element.userId
		}
	));

	socket.on(USER_LIKE_EVENT, handleUserLikeEvent);
	socket.on(USER_DIS_LIKE_EVENT, handleUserDisLikeEvent);
	socket.on(USER_MATCH_EVENT, handleUserMatchesEvent);
	socket.on(USER_MESSAGE_NOTIFICATION_EVENT, handleMessageNotificationEvent);
	socket.on(USER_VISIT_EVENT, handleUserVisitsEvent);
};
