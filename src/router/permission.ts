import {getToken} from "@/utils/cookies.ts";
import {useUserStore} from "@/store/modules/user.ts";
import {Router} from "vue-router";
import {usePermissionStore} from "@/store/modules/permission.ts";
import NProgress from "@/utils/progress";
import {useConfigStore} from "@/store/modules/config.ts";

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
                const useUser = useUserStore()
                await usePermission.getRoutes()
                await useUser.getUser()

            }
            next();

        }
    )
    router.afterEach(() => {
        setTimeout(() => {
            const useConfig = useConfigStore()
            useConfig.GlobalConf.init = true
        }, 1000)
        NProgress.done();
    });

}


export default createRouterGuards
