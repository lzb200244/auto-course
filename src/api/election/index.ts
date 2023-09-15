import request, {APiResponse, APIResponseList} from "@/api";
import {PartialSelectListReq} from "@/types/request/election.ts";
import {Election, SelectCourse} from "@/types/response/election.ts";

const getSelectCourseList = async (data: PartialSelectListReq) => {
    return await request.get<APIResponseList<SelectCourse[]>>({
        params: data,
        isAuth: true,
        url: '/election/selects/'
    });
}
const getMySelectCourseList = async () => {
    return await request.get<APIResponseList<SelectCourse[]>>({
        isAuth: true,
        url: '/election/selects/my'
    });
}

const postSelectCourse = async (courseID: number) => {
    return await request.post<APiResponse<Election>>({
        data:{
            courseID
        },
        isAuth: true,
        url: '/election/selects/'
    });
}
export {
    getSelectCourseList, getMySelectCourseList,postSelectCourse
};
