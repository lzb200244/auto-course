<template>
    <a-menu
            v-model:selectedKeys="current"
            theme="dark" mode="inline">
        <a-sub-menu v-for="route in myPages" :key="route.id" :title="route.name">
            <template v-for="child in route.children" :key="child">
                <router-link :to="child.path">
                    <a-menu-item :key="child.path">
                        {{ child.name }}
                    </a-menu-item>
                </router-link>
            </template>
        </a-sub-menu>
    </a-menu>
</template>
<script setup lang="ts">

import {computed} from "vue";

import {usePermissionStore} from "@/store/modules/permission.ts";
import {useRoute} from "vue-router";

const route = useRoute()
const current = computed(() => [route.fullPath])
const usePermission = usePermissionStore();
const myPages = computed(() => usePermission.myPages)

</script>
<style scoped>

</style>
