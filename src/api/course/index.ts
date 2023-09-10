import request, {APiResponse, APIResponseList} from "@/api";
import {CourseReq, PublishCourseReq} from "@/types/request/course.ts";
import {Course, PublishCourse} from "@/types/response/course.ts";
import {Pager} from "@/hooks/pages";
import {Page} from "@/consts/page.ts";

const createCourse = async (data: CourseReq) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/courses/'
    });
}
//  获取我创建的课程
const getListCourse = async (pager: Pager = {current: 1, pageSize: Page.PageSize}) => {
    return await request.get<APIResponseList<Course[]>>({
        isAuth: true,
        params: {
            page: pager.current,
            size: pager.pageSize
        },
        url: '/courses/'
    });
}
const publishCourseApi = async (data: PublishCourseReq) => {
    return await request.post<APiResponse<string>>({
        url: "/courses/publish",
        data: data,
        isAuth: true
    })
}
const cancelCourseApi = async (courseID: number) => {
    return await request.delete<APiResponse<string>>({
        url: "/courses/publish",
        data: {
            courseID
        },
        isAuth: true
    })
}

const getPublishCourse = async (pager: Pager = {current: 1, pageSize: Page.PageSize}) => {
    return await request.get<APIResponseList<PublishCourse[]>>({
        isAuth: true,
        params: {
            page: pager.current,
            size: pager.pageSize
        },
        url: '/courses/publish'
    });
}
export {
    createCourse, getListCourse, publishCourseApi, cancelCourseApi, getPublishCourse
}
