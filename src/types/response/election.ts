interface SelectCourse {
    id: number,
    code: string,
    title: string,
    desc: string,
    teacher: string,
    credit: number,
    cover: string,
    capacity: number,
    categoryID: number,
    isPreLoad: boolean,
    schedule: string,
    startTime: number,
    endTime: number
}
export {
    SelectCourse
}
