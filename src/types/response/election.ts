interface SelectCourse {
    id: number,
    code: string,
    title: string,
    desc: string,
    teacher: string,
    credit: number,
    cover: string,
    capacity: number,
    left: number,
    categoryID: number,
    isPreLoad: boolean,
    schedule: string,
    startTime: number,
    endTime: number
}

interface Election {
    capacity: number
    courseID: number
}

export {
    SelectCourse,Election
}
