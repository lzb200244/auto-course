import {defineStore} from 'pinia'
import {CourseList} from "@/types/response/course.ts";
import {getListCourse} from "@/api/course";
import {Pager} from "@/hooks/pages";

interface State {
    courseList: CourseList[]
}

export const useCourseStore = defineStore('course', {
    state: (): State => {
        return {
            courseList: [] as CourseList[],
        }
    },
    getters: {},
    actions: {
        async getCourseList() {
            const res = await getListCourse()
            this.courseList = res.data.results
            return res
        },
        async getMoreCourseList(pager: Pager) {

            const res = await getListCourse(pager)
            this.courseList = this.courseList.concat(res.data.results)
            return res

        }

    }
})

