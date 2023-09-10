import request, {APiResponse} from '@/api'
import {UserResult} from "@/types/response/user.ts";
import {RegisterReq, UpdateInfoReq, UserReq} from "@/types/request/user.ts";

const asyncLogin = async (data: UserReq) => {
    return await request.post<APiResponse<UserResult>>({
        data,
        isAuth: false,
        url: 'users/login'
    });
}

const asyncRegister = async (data: RegisterReq) => {
    return await request.post<APiResponse<string>>({
        data,
        isAuth: false,
        url: 'users/register'
    });
}


const getUser = async () => {
//     获取用户消息
    return await request.get<APiResponse<UserResult>>({
        isAuth: true,
        url: '/users'
    })
}
const updateInfo = async (data: UpdateInfoReq) => {
    return await request.put<APiResponse<string>>({
        isAuth: true,
        url: '/users',
        data: data
    })
}

export {
    asyncRegister, asyncLogin,
    updateInfo, getUser,
}
