import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Music from '../views/Music.vue'
import Radio from '../views/Radio.vue'
import Like from '../views/Like.vue'
import LocalFile from '../views/LocalFile.vue'
import PlayList from '../views/PlayList.vue'


// 路由信息
export const routes = [
    {
        path: '/',
        name: 'Home',
        component:Home,
        meta: {
            title: '推荐',
        },
    },
    {
        path: '/music',
        name: 'Music',
        component: Music,
        meta: {
            title: '音乐馆',
        },
    },
    {
        path: '/radio',
        name: 'Radio',
        component: Radio,
        meta: {
            title: '电台',
        },
    },
    {
        path: '/like',
        name: 'Like',
        component:Like,
        meta: {
            title: '喜欢',
        },
    },
    {
        path: '/localFile',
        name: 'LocalFile',
        component:LocalFile,
        meta: {
            title: '本地音乐',
        },
    },
    {
        path: '/playList',
        name: 'PlayList',
        component: PlayList,
        meta: {
            title: '歌单',
        },
    },

]

// 导出路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

//createWebHistory() 


export default router