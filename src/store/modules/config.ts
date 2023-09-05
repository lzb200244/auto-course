import {defineStore} from 'pinia'
import {nextTick} from "vue";


interface State {
    GlobalConf: {
        init: boolean,// 是否初始化完成
        isCollapsed: boolean,//侧边栏
        showAside: boolean //是否展示侧边栏
        isFullscreen: boolean//是否全屏
        isRouterAlive: boolean //是否刷新
    },
}

export const useConfigStore = defineStore('config', {
    state: (): State => {
        return {
            GlobalConf: {
                init: false,
                isCollapsed: false,
                showAside: true,
                isFullscreen: false,
                isRouterAlive: true
            },
        }
    },
    actions: {
        showAside() {
            this.GlobalConf.showAside = !this.GlobalConf.showAside
        },
        setFullscreen() {
            this.GlobalConf.isFullscreen === true
                ? document.exitFullscreen() : document.body.requestFullscreen()

            this.GlobalConf.isFullscreen = !this.GlobalConf.isFullscreen
        },

         reload(){
            this.GlobalConf.isRouterAlive = false;
             console.log(111)
            const that=this
             nextTick(function () {
                that.GlobalConf.isRouterAlive = true;
            });
        }

    }
})


