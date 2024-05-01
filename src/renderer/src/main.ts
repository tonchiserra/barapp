import { createApp } from 'vue'
import "./styles.scss"
import App from './App.vue'

import router from './helpers/Router'

createApp(App).use(router).mount('#app')