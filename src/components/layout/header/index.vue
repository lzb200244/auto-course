<template>
    <a-row v-if="GlobalConf.showAside">
        <a-menu
                theme="light"
                style="width: 100%;height: 45px;line-height: 45px" mode="horizontal"
                :default-selected-keys="['1']">
            <a-menu-item key="1">
                <a-breadcrumb style="margin: 8px 0">
                    <a-breadcrumb-item v-for="item in nav" :key="item">
                        {{ item }}
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-menu-item>
            <a-menu-item key="2" style="margin-left: auto">
                <a-dropdown>
                    <a class="ant-dropdown-link" @click.prevent>
                        <a-avatar :src="user.avatar" :size="25" >
                            {{ user.username.slice(0, 1) }}
                        </a-avatar>

                        <span style="margin-left: 10px">{{ user.username }}</span>
                    </a>
                    <template #overlay>
                        <a-menu style="margin-top: 15px">
                            <a-menu-item>
                                <span> <UserOutlined/></span>
                                <router-link to="/user/my">
                                    个 人
                                </router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <span> <LogoutOutlined/></span>
                                <router-link to="login" @click="logout">
                                    退出系统
                                </router-link>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>

            </a-menu-item>
            <a-menu-item key="3">
                <SettingOutlined/>
            </a-menu-item>

            <a-menu-item @click="setFullscreen" key="4">
                <template v-if="GlobalConf.isFullscreen">
                    <FullscreenOutlined/>
                </template>
                <template v-else>
                    <FullscreenExitOutlined/>
                </template>
            </a-menu-item>

        </a-menu>
    </a-row>
    <a-row align="middle" class="px-5px" style="border-bottom: 1px solid #e8e8e8">


        <a-menu mode="horizontal"
                v-model:selectedKeys="current"
                style="width: 100%;height: 40px;line-height: 40px">
            <a-menu-item
                    style="font-size: 10px"
                    @click="$router.push(item.path)"
                    v-for="item in myPages"
                    :key="item.path">
                <a-dropdown :trigger="['contextmenu']">
                          <span>
                   {{ item.title }}
                   <CloseOutlined v-once style="font-size: 10px" @click="closeTag(item)"/>
                </span>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="close" @click="closeTag(item)">
                                <span>关闭标签页</span>
                            </a-menu-item>
                            <a-menu-item key="reload" @click="reload">
                                <span>重写加载</span>
                            </a-menu-item>
                            <a-menu-item key="closeOthers" @click="closeOthers(item)">
                                <span>关闭其它标签页</span>
                            </a-menu-item>
                            <a-menu-item key="closeAll" @click="closeAll">
                                <span>关闭所有标签页</span>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-menu-item>


            <a-menu-item style="margin-left: auto">
                <a-tag @click="showAside" class="cursor-pointer">
                    <template v-if="GlobalConf.showAside">
                        <BorderOuterOutlined/>
                    </template>
                    <template v-else>
                        <BorderInnerOutlined/>
                    </template>
                </a-tag>
            </a-menu-item>

        </a-menu>


    </a-row>
</template>
<script setup lang="ts">
import {
    SettingOutlined,
    LogoutOutlined,
    UserOutlined,
    CloseOutlined,
    FullscreenOutlined,
    BorderOuterOutlined,
    BorderInnerOutlined,
    FullscreenExitOutlined
} from "@ant-design/icons-vue";
import {UserResult} from "@/types/response/user.ts";
import {useUserStore} from "@/store/modules/user.ts";
import {useRoute} from "vue-router";
import {usePermissionStore} from "@/store/modules/permission.ts";
import {removeToken} from "@/utils/cookies.ts";
import {ref, watch, computed} from "vue";

import {useConfigStore} from "@/store/modules/config.ts";
import {Route} from "@/components/layout/header/types.ts";

defineProps({
    user: {
        type: Object as () => UserResult,
        required: true
    }
})
const {showAside, setFullscreen,reload, GlobalConf} = useConfigStore()
const route = useRoute()
const myPages = ref<Route[]>([]);

const current = ref([route.fullPath])
const nav = computed(() => {
    return route.fullPath.split("/")
})
const closeTag = (r: Route) => {
    console.log(r)
    myPages.value = myPages.value.filter(item => item.path !== r.path)
}
const closeOthers = (r: Route) => {
    myPages.value = myPages.value.filter(item => item.path === r.path)
}
const closeAll = () => {
    myPages.value = []
}


/**
 * 退出登录
 */
const logout = () => {
    useUserStore().clearUser()
    usePermissionStore().clearPermission()
    removeToken('access_token')
}

watch(() => route.fullPath, (val) => {
    current.value = [val]
    if (route.meta) {
        for (const item of myPages.value) {
            if (item.path === route.path) {
                return
            }
        }
        myPages.value.push({
            parentID:route.parentID,
            title: route?.meta?.title,
            path: route.path,
        } )
    }
})

watch(() => myPages.value.length, (val) => {
    if (val === 0) {
        myPages.value.push(
            {
                parentID:route.parentID,
                title: route?.meta?.title,
                path: route.path,
            },
        )
    }
})


</script>

