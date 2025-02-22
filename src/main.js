import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router); 
app.use(pinia);
app.use(vuetify);
app.mount('#app');