<template>
    <a-row>
        <a-form style="width: 100%">
            <a-form-item>
                <template #label>
                    <span>  <SearchOutlined/> 搜 索 </span>
                </template>
                <a-input-search
                        enter-button
                        placeholder="请输入关键词"
                        @search="onSearch" v-model:value="formState.q"/>
            </a-form-item>
            <a-form-item>
                <template #label>
                    <span>  <MenuOutlined/> 筛 选 </span>
                </template>
                <a-radio-group @change="onSearch" v-model:value="formState.option" style="width: 100%">
                    <a-radio-button
                            style="border-radius: 0;margin:5px"
                            v-for="item in categoryList"
                            :value="item.id"
                            :key="item.id">
                        {{ item.name }}
                    </a-radio-button>
                    <a-button style="float:right;" type="link" @click="reset">
                        重置
                    </a-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item>
                <template #label>
                    <span><RiseOutlined/> 排 序</span>
                </template>
                <a-checkbox>时间</a-checkbox>
            </a-form-item>
        </a-form>
    </a-row>
    <a-row>
        <a-float-button-group shape="circle">
            <a-float-button @click="myCar" :badge="{ count: mySelectCourseList.length }">
                <template #tooltip>
                    <span>我的选择的课程</span>
                </template>
                <template #icon>
                    <ShoppingCartOutlined/>
                </template>
            </a-float-button>
            <a-back-top :visibility-height="0"/>
        </a-float-button-group>

        <a-drawer
                width="50%"
                v-model:open="open"
                title="我选择的课程"
                placement="right">
            <a-list
                    item-layout="vertical"
                    :data-source="mySelectCourseList"
                    style="width: 100%;"
            >
                <template #renderItem="{ item }">
                    <a-list-item>

                        <a-list-item-meta>
                            <template #description>
                                <a-space>
                                    <span>课程编号：{{ item.code }}</span>
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
        </a-drawer>
        <a-list
                :loading="isLoading"
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
    </a-row>
</template>

<script setup lang="ts">
import {useElectionStore} from "@/store/modules/election.ts";
import {useCourseStore} from "@/store/modules/course.ts";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {SearchOutlined, MenuOutlined, RiseOutlined, ShoppingCartOutlined} from "@ant-design/icons-vue"
import {SelectCourse} from "@/types/response/election.ts";
import {message} from "ant-design-vue";

const formState = ref({
    q: undefined,
    option: undefined
})
const open = ref(false)
const isLoading = ref(false)
const pagination = {
    current: 1,
    pageSize: 3,
    total: 8,
    onChange: function (page: number) {
        this.current = page
        election.getMorePreloadCourseList(
            {
                title: formState.value.q,
                category: formState.value.option,
                page: pagination.current,
                size: pagination.pageSize

            }
        )
    }
}
const router = useRouter()
const course = useCourseStore()
const election = useElectionStore()
const categoryList = computed(() => course.categoryList)
const selectCourseList = computed(() => election.selectCourseList)
const mySelectCourseList = computed(() => election.mySelectCourseList)
course.getCategoryList()
election.getSelectCourseList(
    {
        title: formState.value.q,
        category: formState.value.option,

    }
).then(() => {
    isLoading.value = false
})
const reset = async () => {
    isLoading.value = true
    await router.replace({
        path: '/election/select', query: {
            q: formState.value.q,
            option: formState.value.option
        }
    })
    pagination.total = await election.getSelectCourseList({
        page: pagination.current,
        size: pagination.pageSize
    })
    pagination.current = 1
    isLoading.value = false

}
const onSearch = async () => {
    isLoading.value = true
    await router.replace({
        path: '/election/select', query: {
            q: formState.value.q,
            option: formState.value.option
        }
    })
    pagination.total = await election.getSelectCourseList({
        title: formState.value.q,
        category: formState.value.option,
        page: pagination.current,
        size: pagination.pageSize
    })
    pagination.current = 1
    isLoading.value = false
}
const myCar = () => {
    open.value = true
}
const selectCourse = (item: SelectCourse) => {
    election.pushMySelectCourseList(item)
    message.success("选择成功")
}
</script>
