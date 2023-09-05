import {RouteRecordRaw} from "vue-router";

const defaultRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/auth/login'),
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false
        }
    },
    {
        path: "/register",
        name: "register",
        component: () => {
            return import('@/views/auth/register');
        },
        meta: {
            title: '注册',
            keepAlive: true,
            requireAuth: false
        }
    },
    // {
    //     path:"/admin/pages",
    //     name:"pages",
    //     component:()=>import("@/views/admin/pages/index.vue")
    // }
]


export default defaultRoutes
