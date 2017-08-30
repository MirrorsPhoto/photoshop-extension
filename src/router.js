import Vue from 'vue';
import Router from 'vue-router';

import Index from './components/pages/Index.vue';
import Auth from './components/pages/Auth.vue';

Vue.use(Router);

const vueRouter = new Router({
    routes: [
        {
            path: '/',
            component: Index,
            meta: { private: true }
        },
        {
            path: '/login',
            component: Auth
        }
    ]
});
vueRouter.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.private)) {
        const token = localStorage.getItem('token');
        (!token) ? next({ path: '/login' }) : next();
    }
    else next();
});

export default vueRouter;