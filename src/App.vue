<template>

    <div>
        <tempalte  v-if="!WHITE_LIST.includes($route.name)">

            <home-view />
        </tempalte>
        <template v-else>
            <router-view/>
        </template>
    </div>
</template>

<script setup>
const WHITE_LIST=['login','register']
import HomeView from "@/views/home/index";
</script>
