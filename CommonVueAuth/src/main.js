import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'; //optimize this to only import the icons you need

import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

import toastrPlugin from './plugins/toastrPlugin';
import DashboardLayout from './components/Layout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

library.add(fas);
library.add(fab);
library.add(far);


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(pinia);
app.use(router)
app.use(VueAxios,axios)

app.use(toastrPlugin);
app.component('fa', FontAwesomeIcon);
app.mount('#app')
