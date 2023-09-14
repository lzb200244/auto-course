<template>
    <course-select class="w-full" v-model:value="value"/>
</template>

<script setup lang="ts">
import {ref} from "vue";

const value = ref();
import CourseSelect from '@/components/course/select/index.vue';

</script>
