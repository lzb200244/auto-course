
import request, {APiResponse} from "@/api";

/**
 * 获取cos凭证
 * @param
 */
 const getKodo = async () => {
    return await request.get<APiResponse<string>>({
        isAuth: true,
        url: '/credit/kodo',
    })
}
export {
    getKodo
}
