import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

import toastrPlugin from './plugins/toastrPlugin';


const app = createApp(App)

const pinia = createPinia()

app.use(pinia);
app.use(router)
app.use(VueAxios,axios)

app.use(toastrPlugin);

app.mount('#app')
