import './assets/main.css'
import router from "./router";
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import Button from "primevue/button"
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.component('Button', Button);
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.use(ToastService);

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});

app.mount('#app')