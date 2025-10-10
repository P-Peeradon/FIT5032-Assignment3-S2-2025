import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router'; // Assuming you already set up Vue Router

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app');
