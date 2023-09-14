import {defineStore} from 'pinia'
import {Category, Course, PublishCourse} from "@/types/response/course.ts";
import {getListCategory, getListCourse, getPublishCourse} from "@/api/course";
import {Pager} from "@/hooks/pages";
import {getPreloadCourse} from "@/api/admin";

interface State {

    courseList: Course[]
    publishCourseList: PublishCourse[]
    preloadCourseList: PublishCourse[]
    categoryList: Category[]

}

export const useCourseStore = defineStore('course', {
    state: (): State => {
        return {
            courseList: [] as Course[],
            publishCourseList: [] as PublishCourse[],
            preloadCourseList: [] as PublishCourse[],
            categoryList: [] as Category[]
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

        },
        async getPublishCourseList() {
            const res = await getPublishCourse()
            this.publishCourseList = res.data.results
            return res
        },
        async getMorePublishCourseList(pager: Pager) {

            const res = await getPublishCourse(pager)
            this.publishCourseList = this.publishCourseList.concat(res.data.results)
            return res
        },
        async getPreloadCourseList() {
            if (this.preloadCourseList.length !== 0) return
            const res = await getPreloadCourse()
            this.preloadCourseList = res.data.results
            return res
        },
        async getMorePreloadCourseList(pager: Pager) {

            const res = await getPreloadCourse(pager)
            //         this.publishCourseList = this.publishCourseList.concat(res.data.results)

            this.preloadCourseList = this.preloadCourseList.concat(res.data.results)
            return res
        },
        async getCategoryList() {
            if (this.categoryList.length !== 0) return
            const res = await getListCategory()
            this.categoryList = res.data.results
            return res
        },
        async getMoreCategoryList(pager: Pager) {
            const res=await getListCategory(pager)
            this.categoryList = this.categoryList.concat(res.data.results)
            return res
        },
        addCourse2PublishCourse(course: Course) {
            this.publishCourseList.push(<PublishCourse>course)
        },
        cancelPublishCourse(courseID: number) {
            this.publishCourseList = this.publishCourseList.filter(
                item => item.id != courseID
            )
        },
        addCategory(category: Category) {
            this.categoryList.push(category)
        }

    }
})

