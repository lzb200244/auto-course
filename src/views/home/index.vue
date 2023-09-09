<template>
    <a-row class="overflow-y-hidden h-screen">
        <a-layout v-show="GlobalConf.init">
            <a-layout-sider
                    v-if="GlobalConf.showAside"
                    v-model:collapsed="GlobalConf.isCollapsed" collapsible>
                <aside-layout/>
            </a-layout-sider>
            <a-layout class="h-screen">
                <a-layout-header
                        v-if="Object.keys(user).length>0"
                        style="background: #fff; padding: 0;height: auto;">
                    <header-layout :user="user"/>
                </a-layout-header>
                <a-layout-content class="h-screen overflow-y-scroll">
                    <a-card :bordered="false">
                        <template #title>
                        </template>
<!--                        <transition name="slide" mode="out-in">-->
                            <router-view v-if="GlobalConf.init" />

<!--                        </transition>-->
                    </a-card>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <a-layout style="display: flex;justify-content: center;align-items: center" v-show="!GlobalConf.init">
            <a-spin/>
        </a-layout>

    </a-row>
</template>
<script lang="ts" setup>

import {computed} from 'vue';
import HeaderLayout from "@/components/layout/header/index.vue";
import {useUserStore} from "@/store/modules/user.ts";
import AsideLayout from "@/components/layout/aside/index.vue";
import {useConfigStore} from "@/store/modules/config.ts";

const userStore = useUserStore()
const {GlobalConf} = useConfigStore()
const user = computed(() => userStore.user)

</script>
<style scoped>
::v-deep .ant-card-head {
    padding: 0 10px;
}

</style>
