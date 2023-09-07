import request, {APiResponse, APIResponseList} from "@/api";
import {CourseReq} from "@/types/request/course.ts";
import {CourseList} from "@/types/response/course.ts";

const createCourse = async (data: CourseReq) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/course/teacher/'
    });
}
//  获取我创建的课程
const getListCourse = async () => {
    return await request.get<APIResponseList<CourseList[]>>({
        isAuth: true,
        params: {
            page: 12,
            size: 10
        },
        url: '/course/teacher/'
    });
}

export {
    createCourse, getListCourse
}
