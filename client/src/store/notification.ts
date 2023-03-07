import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
    const notificationList = ref([])
    return {
        notificationList
    };
})