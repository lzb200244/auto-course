<template>
    <a-row class="my-2">
        <a-button-group style="margin-left: auto">
            <a-space>
                <a-button type="primary" @click="openCreateCourseDrawer">新建</a-button>
            </a-space>
        </a-button-group>
        <a-drawer
                v-model:open="isCreateDrawerOpen"
                class="custom-class"
                root-class-name="root-class-name"
                :root-style="{ color: 'blue' }"
                style="color: red"
                title="新建课程"
                placement="right"
        >
            <a-form
                    ref="createFormRef"
                    :model="createCourseForm"
            >
                <a-form-item label="课程标题"
                             name="title"
                             :rules="[{ required: true, message: '请输入课程标题' }]">
                    <a-input v-model:value="createCourseForm.title"/>
                </a-form-item>
                <a-form-item label="课程描述"
                             :rules="[{ required: true, message: '请输入课程描述' }]"
                             name="desc">
                    <a-input v-model:value="createCourseForm.desc"/>
                </a-form-item>
                <a-form-item label="课程讲师"
                             :rules="[{ required: true, message: '请输入课程讲师' }]"
                             name="teacher">
                    <a-input v-model:value="createCourseForm.teacher"/>
                </a-form-item>

                <a-form-item label="课程学分"
                             :rules="[{ required: true, message: '请输入课程学分' }]"
                             name="credit">
                    <a-input type="number" min="0" v-model:value.number="createCourseForm.credit"/>
                </a-form-item>
                <a-form-item label="课程分类"
                             :rules="[{ required: true, message: '请输入课程分类' }]"
                             name="categoryID">
                    <course-select v-model:value="createCourseForm.categoryID"/>
                </a-form-item>
                <a-form-item label="上课时间"
                             :rules="[{ required: true, message: '请输入上课时间' }]"
                             name="schedule">
                    <a-time-range-picker
                            :format="scheduleRangeFormat"
                            v-model:value="scheduleRange"/>
                </a-form-item>
                <a-form-item label="课程开课时间段"
                             :rules="[{ required: true, message: '请输入课程开课时间段', }]"
                >
                    <a-range-picker v-model:value="dateRange" :format='dateRangeFormat'/>

                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="createCourseSubmit">Create</a-button>

                </a-form-item>
            </a-form>
        </a-drawer>
    </a-row>
    <a-row>
        <a-table
                :loading="isLoading"
                :row-key="record=>record.id"
                style="width: 100%"
                :dataSource="courseList"
                :columns="courseColumns"
                :pagination="pagination"
                @change="handleTablePaginationChange"
        >
            <template #bodyCell="{ column, record }">


                <template v-if="column.dataIndex === 'action'">
                    <template v-if="record.isPreLoad">
                        <a-button type="link">已经发布</a-button>
                    </template>
                    <template v-else>
                        <a-button type="link" class="cursor-pointer" @click="openPublishCourseModal(record.id)">
                            点击发布
                        </a-button>
                    </template>
                    <a-popconfirm
                            title="是否确认删除该课程"
                            ok-text="确认"
                            cancel-text="取消">
                        <a-button type="link" danger>删除</a-button>
                    </a-popconfirm>
                    <a-button type="link" @click="edit(record.id)">编辑</a-button>
                </template>
                <template v-if="column.dataIndex === 'startTime'">
                    <span>{{ dayjs(record.startTime).format('YYYY-MM-DD') }}</span>
                </template>
                <template v-if="column.dataIndex === 'endTime'">
                    <span>{{ dayjs(record.endTime).format('YYYY-MM-DD') }}</span>
                </template>

            </template>
        </a-table>
        <a-modal
                ok-text="确认发布"
                @cancel="publishCourseForm.capacity=0"
                cancel-text="取消发布"
                @ok="publishCourse"
                v-model:open="isPublishModalOpen"
                title="预抢课"
        >
            <a-form
                    autocomplete="off"
                    :model="publishCourseForm"
            >
                <a-form-item
                        label="课程容量"
                        name="capacity"
                        :rules="[{ required: true, message: '请输入课程容量',min:0,type:'number'}]"
                >
                    <a-input v-model:value.number="publishCourseForm.capacity" type="number"/>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal
                ok-text="确认修改"
                cancel-text="取消修改"
                v-model:open="isUpdateModalOpen"
                title="修改课程"
                @ok="upDateCourse"
                @cancel="cancel"
        >
            <a-form
                    ref="updateDataFormRef"
                    autocomplete="off"
                    :model="updateDataForm"
            >
                <a-form-item
                        label="课程名称"
                        name="title"
                        :rules="[{ required: true, message: '请输入课程名称'}]"
                >
                    <a-input v-model:value="updateDataForm.title"/>
                </a-form-item>
                <a-form-item
                        label="课程描述"
                        name="desc"
                        :rules="[{ required: true, message: '请输入课程描述'}]"
                >
                    <a-input v-model:value="updateDataForm.desc"/>
                </a-form-item>
                <a-form-item
                        label="课程学分"
                        name="credit"
                        :rules="[{ required: true, message: '请输入课程学分',min:0,type:'number'}]"
                >
                    <a-input v-model:value.number="updateDataForm.credit" type="number" min="0"/>
                </a-form-item>
                <a-form-item
                        label="课程分类"
                        name="categoryID"
                        :rules="[{ required: true, message: '请输入课程分类'}]"
                >
                    <course-select v-model:value="updateDataForm.categoryID"/>
                </a-form-item>
                <a-form-item
                        label="上课时间段"
                        name="schedule"
                        :rules="[{ required: true, message: '请输入上课时间段'}]"
                >
                    <a-input v-model:value="updateDataForm.schedule"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-row>
</template>
<script setup lang="ts">
import dayjs, {Dayjs} from 'dayjs';
import {CourseReq, PublishCourseReq, UpdateCourseReq} from "@/types/request/course.ts";
import {computed, reactive, ref, watch,} from "vue";
import {message} from "ant-design-vue";
import {courseColumns} from "@/consts/columns.ts";
import {dateRangeFormat, scheduleRangeFormat} from "@/enums/days.ts";
import usePager, {Pager} from "@/hooks/pages";
import {createCourse, publishCourseApi, updateCourseApi} from "@/api/course";
import {useCourseStore} from "@/store/modules/course.ts";
import CourseSelect from "@/components/course/select/index.vue";

const isLoading = ref<boolean>(false)
const {pagination, pageRange, Max, setMax} = usePager()
const createFormRef = ref();
const updateDataFormRef = ref()

const dateRange = ref<[Dayjs, Dayjs]>([]);
const scheduleRange = ref<[Dayjs, Dayjs]>([]);
const isCreateDrawerOpen = ref<boolean>(false);
const isPublishModalOpen = ref<boolean>(false);
const isUpdateModalOpen = ref<boolean>(false);
const courseList = computed(() => {
    return useCourse.courseList.slice(pageRange.value[0], pageRange.value[1])
})
const createCourseForm = reactive<CourseReq>({
    title: '',
    desc: '',
    teacher: '',
    capacity: 0,
    credit: 0,
    categoryID: 0,
    schedule: '',
    startTime: 0,
    endTime: 0,
})
const publishCourseForm = reactive<PublishCourseReq>({
    capacity: 0,
    courseID: 0
})
const useCourse = useCourseStore()
// 获取课程列表
useCourse.getCourseList().then(res => {
    pagination.total = res.data.count
})

const updateDataForm = ref<UpdateCourseReq>({} as UpdateCourseReq)
const edit = (id: number) => {
    isUpdateModalOpen.value = true
    const item = courseList.value.filter(item => id === item.id)[0]
    updateDataForm.value.id = id
    updateDataForm.value.title = item.title
    updateDataForm.value.desc = item.desc
    updateDataForm.value.credit = item.credit
    updateDataForm.value.categoryID = item.categoryID
    updateDataForm.value.schedule = item.schedule
};

const upDateCourse = async () => {
    await updateDataFormRef.value.validate()
    await updateCourseApi(updateDataForm.value)
    const item = courseList.value.filter(item => updateDataForm.value.id === item.id)[0]
    Object.assign(item, updateDataForm.value)
    message.success("修改课程成功")
}

const cancel = () => {
    updateDataForm.value = {} as UpdateCourseReq
    isUpdateModalOpen.value = false
};
// 监听开课时间和结课时间的变化
watch(dateRange, () => {
    createCourseForm.startTime = dateRange.value[0].toDate().getTime()
    createCourseForm.endTime = dateRange.value[1].toDate().getTime()
})
// 监听上课时间段的变化
watch(scheduleRange, () => {
    createCourseForm.schedule = scheduleRange.value[0].format(scheduleRangeFormat) + "-" +
        scheduleRange.value[1].format(scheduleRangeFormat)
})
/**
 * 创建新的课程
 */
const createCourseSubmit = async () => {
    try {
        await createFormRef.value.validate() // 参数校验失败了
        await createCourse(createCourseForm) // 创建失败
        Object.assign(createCourseForm, {})
        isCreateDrawerOpen.value = false
        message.success("创建课程成功")
    } catch (e) {
        console.log(e)
        return
    }
}
const openCreateCourseDrawer = () => {
    isCreateDrawerOpen.value = true;
};
// 打开发布课程的模态框
const openPublishCourseModal = (courseID: number) => {
    isPublishModalOpen.value = true
    publishCourseForm.courseID = courseID
}
const publishCourse = async () => {
    try {
        await publishCourseApi(publishCourseForm)
        for (const course of useCourse.courseList) {
            if (course.id === publishCourseForm.courseID) {
                course.isPreLoad = true
                useCourse.addCourse2PublishCourse(course)
                break
            }
        }
        message.success("发布课程成功")
        isPublishModalOpen.value = false
    } catch (e) {
        console.log(e)
    }
}
// 处理表格翻页
const handleTablePaginationChange = async (pager: Pager) => {
    isLoading.value = true
    pagination.current = pager.current
    if (Max.value >= pagination.current) {
        isLoading.value = false
        return
    }
    setMax(pagination.current)
    const res = await useCourse.getMoreCourseList(pagination)
    pagination.total = res.data.count
    isLoading.value = false
}
</script>
