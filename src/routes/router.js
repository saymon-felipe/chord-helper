import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '../pages/home.vue';

const routes = [
    {
        path: "",
        component: home
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;