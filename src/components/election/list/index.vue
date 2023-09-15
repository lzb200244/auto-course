<template>
    <a-list
            item-layout="horizontal"
            :data-source="selectCourseList"
            :pagination="pagination"
            style="width: 100%;"
    >
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a-button @click="selectCourse(item)">选择</a-button>
                </template>
                <a-list-item-meta>
                    <template #description>
                        <a-space>
                            <span>课程编号：{{ item.code }}</span>
                            <span>容量：{{ item.capacity }}</span>
                            <span>剩余：{{item.left}}</span>
                            <span>教师：{{ item.teacher }}</span>
                            <span>学分：{{ item.credit }}</span>
                            <span>时间：{{ item.schedule }}</span>
                        </a-space>
                    </template>
                    <template #title>
                        <router-link to="">{{ item.title }}</router-link>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup lang="ts">
import {useElectionStore} from "@/store/modules/election.ts";
import {ref} from "vue";
import {SelectCourse} from "@/types/response/election.ts";

defineOptions({
    name: 'ElectionList'
})
defineProps({
    selectCourseList: {
        type: Array,
        default: () => []
    }
})
const emit=defineEmits(['select',])
const useElection = useElectionStore()
const formState = ref({
    q: undefined,
    option: undefined
})

const selectCourse = (item: SelectCourse) => {
    emit('select',item)
}

useElection.getSelectCourseList(
    {
        title: formState.value.q,
        category: formState.value.option,

    }
)
const pagination = {
    current: 1,
    pageSize: 3,
    total: 8,
    onChange: function (page: number) {
        this.current = page
        useElection.getMoreSelectCourseList(
            {
                title: formState.value.q,
                category: formState.value.option,
                page: pagination.current,
                size: pagination.pageSize

            }
        )
    }
}
</script>
