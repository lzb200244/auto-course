import {getToken} from "@/utils/cookies.ts";
import {useUserStore} from "@/store/modules/user.ts";
import {Router} from "vue-router";
import {usePermissionStore} from "@/store/modules/permission.ts";
import NProgress from "@/utils/progress";
import {useConfigStore} from "@/store/modules/config.ts";
import {filterAsnycRouter} from "@/router/importRoutercom.ts";

const WHITE_LIST = [
    'login', 'register'
]

const createRouterGuards = (router: Router) => {

    router.beforeEach(
        async (to,
               _,
               next) => {
            NProgress.start()
            // 获取用户是否登录
            const access_token = getToken()
            // 不存在access_token 并且访问的并不是白名单
            if (!access_token && !WHITE_LIST.includes(<string>to.name)) {
                next({
                    path: '/login',
                    query: {
                        next: to.fullPath
                    }
                })
                return
            }
            if (access_token) {
                const usePermission = usePermissionStore()
                const useConfig = useConfigStore()
                const useUser = useUserStore()
                await useUser.getUser()
                if (usePermission.myPages.length === 0) {
                    // 添加动态路由
                    await usePermission.getRoutes()
                    filterAsnycRouter(usePermission.myPages).forEach(
                        (route: any) => {
                            router.addRoute(route)
                        }
                    )
                    next({...to, replace: true}) // 这里相当于push到一个页面 不在进入路由拦截
                    useConfig.GlobalConf.init = true
                    return
                }
            }
            next();

        }
    )
    router.afterEach(() => {


        NProgress.done();
    });

}


export default createRouterGuards
