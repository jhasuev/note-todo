import Vue from 'vue'
import App from './App.vue'
import '@/assets/style.css'

import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

Vue.config.productionTip = false

export const eventEmitter = new Vue();

new Vue({
	router: routes,
	render: h => h(App),
}).$mount('#app')
