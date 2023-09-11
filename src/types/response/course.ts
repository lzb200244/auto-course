interface Course {
    id: number,
    code: string,
    title: string,
    desc: string,
    teacher: string,
    credit: number,
    cover: string,
    categoryID: number,
    isPreLoad: boolean,
    schedule: string,
    startTime: number,
    endTime: number
}


interface PublishCourse {
    id: number,
    title: string,
    teacher: string,
    cover: string,
    capacity: number,
    credit: number,
    categoryID: number,
    schedule: string,
}
interface Category {
    id: number,
    name: string
    desc: string

}



export {
    Course, PublishCourse,Category
}
