<template>
    <a-row>
        <a-table
            :row-key="record=>record.id"
            style="width: 100%"
            :dataSource="courseList"
            :columns="publishCourseColumns"
            :pagination="pagination"
            @change="handleTablePaginationChange"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-tag class="cursor-pointer">修改容量</a-tag>
                    <a-popconfirm
                        title="是否确认取消发布"
                        ok-text="确认"
                        @confirm="cancelPublish(record.id)"
                        cancel-text="取消"
                    >
                        <a-button type="link" danger>取消发布</a-button>
                    </a-popconfirm>
                </template>
                <template v-if="column.dataIndex === 'startTime' || column.dataIndex === 'endTime'">
                    <span>{{ formatDate(record[column.dataIndex]) }}</span>
                </template>
            </template>
        </a-table>
    </a-row>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import {computed,} from "vue";
import { publishCourseColumns} from "@/consts/columns.ts";
import usePager, {Pager} from "@/hooks/pages";
import {useCourseStore} from "@/store/modules/course.ts";
import {cancelCourseApi} from "@/api/course";
import {message} from "ant-design-vue";
import {PublishCourse} from "@/types/response/course.ts";

const {pagination, pageRange, Max, setMax} = usePager()

const courseList = computed<PublishCourse[]>(() => {
    return useCourse.publishCourseList.slice(pageRange.value[0], pageRange.value[1])
})

const useCourse = useCourseStore()
useCourse.getPublishCourseList().then(res => {
    pagination.total = res.data.count
})

const handleTablePaginationChange = async (pager: Pager) => {
    pagination.current = pager.current
    if (Max.value >= pagination.current) return
    setMax(pagination.current)
    const res = await useCourse.getMorePublishCourseList(pagination)
    pagination.total = res.data.count
}

const cancelPublish = async (courseID: number) => {
    try {
        await cancelCourseApi(courseID)
        useCourse.cancelPublishCourse(courseID)
        message.success("取消成功")
    } catch (e) {
        message.error("取消失败:" + e.message)
    }
}

const formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD')
}
</script>
