import Vue                  from 'vue'

import Index from './components/Index/Index.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Index),
}).$mount('#app');
