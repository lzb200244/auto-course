<template>

    <div>
        <tempalte v-if="!WHITE_LIST.includes($route.name)">
            <home-view/>
        </tempalte>
        <template v-else>
            <router-view/>
        </template>
    </div>
</template>

<script setup>
const WHITE_LIST = ['login', 'register']
import HomeView from "@/views/home/index";
</script>
<style>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.75s ease-out;
}


.slide-enter-to {
    position: absolute;
    right: 0;
}


.slide-enter-from {
    position: absolute;
    right: -100%;
}


.slide-leave-to {
    position: absolute;
    left: -100%;
}


.slide-leave-from {
    position: absolute;
    left: 0;
}

</style>
