import {defineStore} from 'pinia'
import {getRoutes} from "@/api/permission";



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
            if (this.myPages.length !== 0) return
            const res = await getRoutes()

            this.myPages = res.data


        },
        clearPermission() {
            this.myPages = []
        }

    }
})


