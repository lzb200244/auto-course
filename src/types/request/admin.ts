interface Meta {

    requireAuth: boolean
    title: string
    keepAlive: boolean
    icon: string
}

export interface RouteReq {
    name: string;   // 标题
    path: string;   // 路由
    redirect: string; // 重定向
    component: string;    // 组件地址、唯一标识
    meta: Meta, // 元信息
    disable: boolean; // 是否禁用
    role: number[]; // 权限级
    parent: number; // 父级
}
export interface CategoryReq {
    name: string;
    desc: string;

}
