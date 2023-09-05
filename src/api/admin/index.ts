import request, {APiResponse} from "@/api";
import {Route} from "@/types/request/admin.ts";

const createPage = async (data: Route) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/admin/page'
    });
}
const updatePage = async (data: Route) => {
    return await request.put<APiResponse<string>>({
        data,
        isAuth: true,
        url: '/admin/page'
    });
}
export {
    createPage,updatePage
}
