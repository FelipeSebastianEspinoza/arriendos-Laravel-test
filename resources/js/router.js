import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import TareaComponent from "./components/TareasComponent.vue";

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: TareaComponent
        }
    ]
});

export default router;
