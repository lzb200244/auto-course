export interface CourseReq {
    title: string;
    desc: string;
    teacher: string;
    capacity?: number;
    credit: number;
    categoryID: number;
    schedule: string;
    startTime: number;
    endTime: number;
}

export interface UpdateCourseReq extends Pick<CourseReq, 'title' | 'desc' | 'credit' | 'categoryID' | 'schedule'> {
    id: number;
}

export interface PublishCourseReq {
    capacity: number,
    courseID: number
}
