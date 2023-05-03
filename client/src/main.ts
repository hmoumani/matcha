import App from '@/App.vue';

import '@/styles/index.css';
import { createPinia } from 'pinia';
import { router } from '@/router';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    position: "bottom-right",
};


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
	faGear,
	faHeart,
	faXmark,
	faFlag,
	faSearch,
	faArrowLeft,
	faPlane,
	faArrowRight,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';
import setupApp from './setupApp';
import Vue3StarRatings from 'vue3-star-ratings';

/* add icons to the library */
library.add(faHeart);
library.add(faPlane);
library.add(faSearch);
library.add(faXmark);
library.add(faPaperPlane);
library.add(faFlag);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faGear);

const app = createApp(App).use(createPinia()).use(router);

app.use(Toast, options);
app.component('vue3-star-ratings', Vue3StarRatings);

setupApp(app).finally(() => {
	app.mount('#app');
});

export default app;
