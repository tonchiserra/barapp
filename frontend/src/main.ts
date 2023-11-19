import { createApp } from 'vue'
import "./styles.scss"
import App from './App.vue'
import './samples/node-api'

import router from './helpers/Router'

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
