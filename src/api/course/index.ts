import request, {APiResponse, APIResponseList} from "@/api";
import {CourseReq} from "@/types/request/course.ts";
import {CourseList} from "@/types/response/course.ts";
import {Pager} from "@/hooks/pages";
import {Page} from "@/consts/page.ts";

const createCourse = async (data: CourseReq) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/course/teacher/'
    });
}
//  获取我创建的课程
const getListCourse = async (pager: Pager = {current: 1, pageSize: Page.PageSize}) => {
    return await request.get<APIResponseList<CourseList[]>>({
        isAuth: true,
        params: {
            page: pager.current,
            size: pager.pageSize
        },
        url: '/course/teacher/'
    });
}

export {
    createCourse, getListCourse
}
