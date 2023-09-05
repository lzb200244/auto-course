import {createApp} from 'vue'
import "./style.css"
import 'virtual:windi.css'

// @ts-ignore
import App from './App.vue'

import setupRouter from "@/router";
import setupStore from "@/store";


const bootstrap = () => {
    const app = createApp(App)
    setupRouter(app)
    setupStore(app)
    app.mount('#app')

}
bootstrap()


