import Vue from 'vue'

//add js, mdbootsrap, and bootstrap
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'

import App from './App.vue'
import router from './router'
import store from './store'

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );

Vue.config.productionTip = false

// add sweetalert2
import SWAL from './class/swal'
import Cards from './components/cards.vue'

Vue.mixin(SWAL)

Vue.use(Cards)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
