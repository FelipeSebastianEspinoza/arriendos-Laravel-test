require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('tareas', require('./components/TareasComponent.vue').default);


Vue.component('categoria-component', require('./components/CategoriaComponent.vue').default);



const app = new Vue({
    el: '#app',
});
