import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { createModal } from '@kolirt/vue-modal'

import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'md-editor-v3/lib/style.css';
import MdEditorWrapper from './components/MdEditorWrapper.vue';

import { marked } from 'marked';

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

provideGlobalGridOptions({ theme: "legacy" });

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


var model = createModal({
    transitionTime: 200,
    animationType: 'slideDown',
    modalStyle: {
        padding: '5rem 2rem',
        align: 'center',
        'z-index': 201
    },
    overlayStyle: {
        'background-color': 'rgba(0, 0, 0, .5)',
        'backdrop-filter': 'blur(5px)',
        'z-index': 200
    }
});

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
app.use(pinia);

app.use(router)
app.use(VueAxios, axios)

app.use(toastrPlugin);
app.component('fa', FontAwesomeIcon);
app.component('AgGridVue', AgGridVue);
app.component('MdEditor', MdEditorWrapper);
app.component('marked',marked);

app.use(model);
app.mount('#app')
