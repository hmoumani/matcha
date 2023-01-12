import App from '@/App.vue';

import '@/styles/index.css';
import { createPinia } from 'pinia';
import { router } from '@/router';

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
	faArrowRight,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';
import setupApp from './setupApp';

/* add icons to the library */
library.add(faHeart);
library.add(faSearch);
library.add(faXmark);
library.add(faPaperPlane);
library.add(faFlag);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faGear);

const app = createApp(App)
	.use(createPinia())
	.use(router)

setupApp().finally(() => {
	app.mount('#app');
})
