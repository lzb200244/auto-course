import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

function setupStore(app: App<Element>) {
    app.use(store);
}

export default setupStore;
