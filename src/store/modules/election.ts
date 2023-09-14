import {defineStore} from 'pinia'
import {getSelectCourseList} from "@/api/election";
import {PartialSelectListReq, SelectListReq} from "@/types/request/election.ts";
import {SelectCourse} from "@/types/response/election.ts";


interface State {
    selectCourseList: SelectCourse[],
    mySelectCourseList: SelectCourse[],
}

export const useElectionStore = defineStore('election', {
    state: (): State => {
        return {
            selectCourseList: [],
            mySelectCourseList: [],
        }
    },
    actions: {
        async getSelectCourseList(data: PartialSelectListReq) {

            const res = await getSelectCourseList(data)
            this.selectCourseList = res.data.results
            return res.data.count
        },
        async getMorePreloadCourseList(data: PartialSelectListReq) {
            const res = await getSelectCourseList(data)
            this.selectCourseList.push(...res.data.results)
            return res.data.results.length === data.size
        },
        pushMySelectCourseList(item: SelectCourse) {
            this.mySelectCourseList.push(item)
        },


    }
})


