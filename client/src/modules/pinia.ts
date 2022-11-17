import { ViteSetupModule } from '@/types/ViteSetupModule';
import { createPinia } from 'pinia';

// Setup Pinia
// https://pinia.esm.dev/
export const install: ViteSetupModule = ({ isClient, initialState, app }) => {
	const pinia = createPinia();
	app.use(pinia);

	if (isClient) pinia.state.value = initialState.pinia || {};
	else initialState.pinia = pinia.state.value;
};
