import { createRouter, createWebHashHistory } from 'vue-router'
// 路由信息
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: '首页',
        },
    }]

// 导出路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

//createWebHistory() 


export default router