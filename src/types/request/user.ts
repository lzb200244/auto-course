export interface UserReq {
    username: string
    password: string
}

export interface RegisterReq {
    username: string
    password: string
    email: string
}

export interface UpdateInfoReq {
    name: string
    email: string
    sex: number
    desc: string
    avatar: string
}
