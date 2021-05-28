import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import {getStorage} from '../storage';
import Login from '../views/Login.vue';
import Main from '../views/Main.vue';
import Home from '../views/hometest.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/park',
  },
  {
    path: '/park',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Main',
    name: 'Main',
    // 只有经过身份验证的用户才能访问
    meta: {requiresAuth: true},
    component: Main,
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  const token = getStorage('token');
  if (to.meta.requiresAuth && !token) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/park',
      // 保存我们所在的位置，以便以后再来
    };
  }
});

export default router;
