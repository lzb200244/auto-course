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
export interface PublishCourseReq {
    capacity: number,
    courseID: number
}
