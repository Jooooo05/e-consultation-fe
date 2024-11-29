import 'boxicons'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import './style.css'
import {fbapp, firestoredb} from './firebase.js';


const app = createApp(App)

app.use(router)
app.config.globalProperties.axios = axios;
app.config.globalProperties.fbapp = fbapp;
app.config.globalProperties.firestoredb = firestoredb;

app.mount('#app')
