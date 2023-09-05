import {defineStore} from 'pinia'
import {UserResult} from "@/types/response/user.ts";
import { getUser, updateInfo} from "@/api/user";
import {UpdateInfoReq} from "@/types/request/user.ts";

interface State {
    user: UserResult
}

export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            user: {} as UserResult,
        }
    },
    getters: {},
    actions: {
        async getUser() {
            if (Object.keys(this.user).length !== 0) return
            const res = await getUser();
            this.setUser(res.data)
        },
        async updateInfo(data: UpdateInfoReq) {
            await updateInfo(data)
            Object.assign(this.user, data)
        },

        clearUser() {
            this.setUser({} as UserResult)
        },
        setUser(user: UserResult) {
            this.user = user
        },


    }
})

