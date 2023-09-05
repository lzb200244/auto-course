import {defineStore} from 'pinia'
import {getRoutes} from "@/api/permission";
import {filterAsnycRouter} from "@/router/importRoutercom.ts";
import { useRouter} from "vue-router";


interface State {
    myPages: any[],
}

export const usePermissionStore = defineStore('permission', {
    state: (): State => {
        return {
            myPages: [],
        }
    },
    actions: {
        async getRoutes() {
            const router = useRouter()
            if (this.myPages.length !== 0) return
            const res = await getRoutes()

            this.myPages = res.data
            // 添加动态路由
            filterAsnycRouter(this.myPages).forEach(
                (route: any) => {
                    router.addRoute(route)
                }
            )
        },
        clearPermission() {
            this.myPages = []
        }

    }
})


