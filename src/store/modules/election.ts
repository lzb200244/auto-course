import {defineStore} from 'pinia'
import {getMySelectCourseList, getSelectCourseList, postSelectCourse} from "@/api/election";
import {PartialSelectListReq} from "@/types/request/election.ts";
import {SelectCourse} from "@/types/response/election.ts";


interface State {
    selectCourseList: SelectCourse[],
    mySelectCourseList: SelectCourse[],
    mySelectList: number[],
}

/**
 *
 */
export const useElectionStore = defineStore('election', {
    state: (): State => {
        return {
            selectCourseList: [],
            mySelectCourseList: [],
            mySelectList: [],
        }
    },
    actions: {
        async getSelectCourseList(data: PartialSelectListReq) {

            const res = await getSelectCourseList(data)
            this.selectCourseList = res.data.results
            return res.data.count
        },
        async getMoreSelectCourseList(data: PartialSelectListReq) {
            const res = await getSelectCourseList(data)
            this.selectCourseList.push(...res.data.results)
            return res.data.results.length === data.size
        },

        /**
         * 获取已选列表
         */
        async getMySelectCourseList() {
            const res = await getMySelectCourseList()

            this.mySelectCourseList = res.data.results
            this.mySelectCourseList.forEach(item => this.mySelectList.push(item.id))
        },
        /**
         * 设置某课程剩余为0
         * @param courseID
         */
        setCourse2Zero(courseID: number) {
            for (const item of this.selectCourseList) {
                if (item.id === courseID) {
                    item.left = 0
                    break
                }
            }
        },
        async pushMySelectCourseList(courseID: number) {
            // 1. 进行发送选课请求
            await postSelectCourse(courseID)
            // 2. 请求成功加入到我的选课列表
            this.mySelectList.push(courseID)
            // 3. 对应课程进行--操作
            for (const item of this.selectCourseList) {
                if (item.id === courseID) {
                    item.left--
                    this.mySelectCourseList.push(item)
                    break
                }
            }
        },
        async removeMySelectCourse(courseID: number) {
            // 1. 进行发送选课请求
            await postSelectCourse(courseID)
            // 2. 从我的选课列表移除
            this.mySelectList = this.mySelectList.filter(
                id => id != courseID
            )
            this.mySelectCourseList = this.mySelectCourseList.filter(
                id => id.id != courseID
            )
            // 3. 对应课程进行++操作
            for (const item of this.selectCourseList) {
                if (item.id === courseID) {
                    item.left++
                    break
                }
            }
        }


    }
})


