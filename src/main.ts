import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';

import './styles/styles.scss'

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
