import request, {APiResponse} from "@/api";
import {RouteReq} from "@/types/request/admin.ts";

const createPage = async (data: RouteReq) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/admin/page'
    });
}
const updatePage = async (data: RouteReq) => {
    return await request.put<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/admin/page'
    });
}
export {
    createPage,updatePage
}
