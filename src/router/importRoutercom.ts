export function filterAsnycRouter(asyncRouterMap: any) {
    return asyncRouterMap.filter((route: any) => {
        route.path = `${route.path}`
        route.component = resolveComponent(route.component);
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsnycRouter(route.children);
        }
        return true;
    })
}

const pages = import.meta.glob("../views/**/index.vue");

const resolveComponent = (name: string) => {
    return pages[`../views${name}/index.vue`];
}
const resolveIcon = (name: any) => {
    console.log(name)
}
