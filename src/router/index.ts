import {createRouter, createWebHashHistory} from "vue-router";
import routes from "@/router/routes.ts";
import createRouterGuards from "@/router/permission.ts";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
const setupRouter =  (app: any) => {
    createRouterGuards(router)
    app.use(router)

}
export default setupRouter
