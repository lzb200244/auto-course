import request, {APiResponse, APIResponseList} from "@/api";
import {RouteReq} from "@/types/request/admin.ts";
import {Pager} from "@/hooks/pages";
import {Page} from "@/consts/page.ts";
import {PublishCourse} from "@/types/response/course.ts";

const createPage = async (data: RouteReq) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/admin/routes'
    });
}
const updatePage = async (data: RouteReq) => {
    return await request.put<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/admin/routes'
    });
}

/**
 * 通知教师预发布课程到待选区
 */
const notify2Teacher = async () => {
    return await request.post<APiResponse<string>>({
        isAuth: true,
        url: '/admin/teachers/notify'
    });
}


const getPreloadCourse=async(pager: Pager = {current: 1, pageSize: Page.PageSize})=>{
    return await request.get<APIResponseList<PublishCourse[]>>({
        isAuth: true,
        url: '/courses',
        params:{
            page: pager.current,
            size: pager.pageSize
        }
    });
}
export {
    createPage, updatePage, notify2Teacher,getPreloadCourse
}
