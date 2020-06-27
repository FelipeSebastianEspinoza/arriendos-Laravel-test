require('./bootstrap');
import BootstrapVue from 'bootstrap-vue' //Importing
import Vuex from 'vuex'
import router from './router'
 
window.Vue = require('vue');
Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('tareas-component', require('./components/TareasComponent.vue').default);

 
 
const app = new Vue({
    el: '#app',
    router
});
