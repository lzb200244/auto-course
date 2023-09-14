import request, {APiResponse} from "@/api";

/**
 * 获取cos凭证
 */
const getKodo = async () => {
    return await request.get<APiResponse<string>>({
        isAuth: true,
        url: '/credits/kodo',
    })
}
export {
    getKodo
}
