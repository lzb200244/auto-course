export interface UserResult {
    id: number;
    username: string;
    name: string;
    email: string;
    sex: number;
    desc: string;
    avatar: string;
    roles: string[]; // 可能需要更具体的类型定义
    permission: number[];
    access_token?: string;
}
