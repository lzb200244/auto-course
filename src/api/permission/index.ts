import request, {APiResponse} from "@/api";

/**
 * 获取权限相关的
 */

/**
 * 获取该用户可访问到的页面
 */
const getRoutes = async () => {
    return await request.get<APiResponse<any[]>>({
        isAuth: true,
        url: '/users/permission'
    })
}
export {
    getRoutes
}
