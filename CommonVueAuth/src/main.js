import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'; //optimize this to only import the icons you need

import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

// const myTheme = themeQuartz.withParams({
//     backgroundColor: "rgb(249, 245, 227)",
//     foregroundColor: "rgb(7, 7, 7)",
//     headerTextColor: "rgb(255, 255, 255)",
//     headerBackgroundColor: "#4F46E5",
//     oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
//     headerColumnResizeHandleColor: "rgb(126, 46, 132)",
//   });

provideGlobalGridOptions({ theme: "legacy"});



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
app.component('AgGridVue', AgGridVue);
app.mount('#app')
