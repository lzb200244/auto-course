import request, {APIResponseList} from "@/api";
import {SelectListReq} from "@/types/request/election.ts";
import {SelectCourse} from "@/types/response/election.ts";

const getSelectCourseList = async (data: SelectListReq) => {
    return await request.get<APIResponseList<SelectCourse[]>>({
        params: data,
        isAuth: true,
        url: '/election/selects/'
    });
}

export {getSelectCourseList};
