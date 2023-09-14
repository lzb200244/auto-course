<template>
    <a-select

            ref="select"
            :options="categoryList"
    ></a-select>
</template>
<script lang="ts" setup>
import {SelectProps} from "ant-design-vue";

defineOptions({
    name: 'CourseSelect',

})
import {useCourseStore} from "@/store/modules/course.ts";
import {computed} from "vue";
import {Category} from "@/types/response/course.ts";

const useCourse = useCourseStore()
useCourse.getCategoryList()
const categoryList = computed<SelectProps['options']>(() => useCourse.categoryList.map(
    (category: Category) => {
        return {
            value: category.id,
            label: category.name
        }
    }
))

</script>

