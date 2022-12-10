import App from '@/App.vue';
import { ViteSSG } from 'vite-ssg';

import '@/styles/index.css';
import { extendedRoutes } from '@/router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faUserSecret);

export const createApp = ViteSSG(
	App,
	{ routes: extendedRoutes },
	async ctx => {
		Object.values(
			import.meta.glob('./modules/*.ts', {
				eager: true,
			})
		).map(i => i.install?.(ctx));
	},
	{}
);
