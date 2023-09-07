<template>
    <a-row>
        <a-button type="primary" @click="showCreateDrawer">新建</a-button>
        <a-drawer
                v-model:open="createState"
                class="custom-class"
                root-class-name="root-class-name"
                :root-style="{ color: 'blue' }"
                style="color: red"
                title="新建课程"
                placement="right"
        >
            <a-form
                    ref="createFormRef"
                    :model="createForm"
            >
                <a-form-item label="课程标题"
                             name="title"
                             :rules="[{ required: true, message: '请输入课程标题' }]">
                    <a-input v-model:value="createForm.title"/>
                </a-form-item>
                <a-form-item label="课程描述"
                             :rules="[{ required: true, message: '请输入课程描述' }]"
                             name="desc">
                    <a-input v-model:value="createForm.desc"/>
                </a-form-item>
                <a-form-item label="课程讲师"
                             :rules="[{ required: true, message: '请输入课程讲师' }]"
                             name="teacher">
                    <a-input v-model:value="createForm.teacher"/>
                </a-form-item>
                <a-form-item label="课程容量"
                             :rules="[{ required: true, message: '请输入课程容量' }]"
                             name="capacity">
                    <a-input type="number" min="0" v-model:value.number="createForm.capacity"/>
                </a-form-item>
                <a-form-item label="课程学分"
                             :rules="[{ required: true, message: '请输入课程学分' }]"
                             name="credit">
                    <a-input type="number" min="0" v-model:value.number="createForm.credit"/>
                </a-form-item>
                <a-form-item label="课程分类"
                             :rules="[{ required: true, message: '请输入课程分类' }]"
                             name="categoryID">
                    <a-input v-model:value.number="createForm.categoryID"/>
                </a-form-item>
                <a-form-item label="课程时间"
                             :rules="[{ required: true, message: '请输入课程时间' }]"
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
        <a-table style="width: 100%" :dataSource="courseList" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-button @click="showPublishMedal(record.id)">发布</a-button>
                    <a-button type="link" danger>删除</a-button>


                </template>
            </template>
        </a-table>
        <a-modal
                ok-text="确认发布"
                @cancel="publishForm.capacity=0"
                cancel-text="取消发布"
                @ok="publishCourse"
                v-model:open="publishState"
                title="预抢课"
        >
            <a-form
                    autocomplete="off"
                    :model="publishForm"

            >
                <a-form-item
                        label="课程容量"
                        name="capacity"
                        :rules="[{ required: true, message: '请输入课程容量',min:0}]"
                >
                    <a-input v-model:value.number="publishForm.capacity" type="number"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-row>
</template>
<script setup lang="ts">
import {Dayjs} from 'dayjs';
import {computed, reactive, ref, watch,} from "vue";
import {CourseReq} from "@/types/request/course.ts";
import {createCourse} from "@/api/course";
import {message} from "ant-design-vue";
import {useCourseStore} from "@/store/modules/course.ts";
import {dateRangeFormat, scheduleRangeFormat} from "@/enums/days.ts";

const useCourse = useCourseStore()
useCourse.getCourseList()
const createFormRef = ref();
const dateRange = ref<[Dayjs, Dayjs]>([]);
const scheduleRange = ref<[Dayjs, Dayjs]>([]);
const columns = ref([
    {
        title: '课程id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: '讲师',
        dataIndex: 'teacher',
        key: 'teacher',
    },
    {
        title: '课程代码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '容量',
        dataIndex: 'capacity',
        key: 'capacity',
    },
    {
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
    },
    {
        title: '分类',
        dataIndex: 'categoryID',
        key: 'categoryID',
    },
    {
        title: '上课时间',
        dataIndex: 'schedule',
        key: 'schedule',
    },
    {
        title: '开课时间',
        dataIndex: 'startTime',
        key: 'startTime',

    },
    {
        title: '结课时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    }

])
const createState = ref<boolean>(false);
const publishState = ref<boolean>(false);
const courseList = computed(() => useCourse.courseList)
const createForm = reactive<CourseReq>({
    title: '',
    desc: '',
    teacher: '',
    capacity: 0,
    credit: 0,
    categoryID: 0,
    schedule: '',
    startTime: 0,
    endTime: 0,
} as CourseReq)
const publishForm = reactive({
    capacity: 0,
    courseID: 0
})

// 开课时间和结课时间
watch(dateRange, () => {
    // 获取时间搓
    createForm.startTime = dateRange.value[0].toDate().getTime()
    createForm.endTime = dateRange.value[1].toDate().getTime()
},)
// 上课时间段
watch(scheduleRange, () => {
    createForm.schedule = scheduleRange.value[0].format("HH:mm") + "-" +
        scheduleRange.value[1].format("HH:mm")
})


const createCourseSubmit = async () => {
    try {
        await createFormRef.value.validate() // 参数校验失败了
        await createCourse(createForm) // 创建失败
        Object.assign(createForm, {})
        createState.value = false
        message.success("创建课程成功")
    } catch (e) {
        console.log(e)
        return
    }
}

const showCreateDrawer = () => {
    createState.value = true;
};


const showPublishMedal = (courseID: number) => {
    publishState.value = true
    publishForm.courseID = courseID

}
const publishCourse = () => {
    console.log(publishForm)
}
</script>
