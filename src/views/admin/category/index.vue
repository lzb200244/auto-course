<template>
    <a-row>
        <a-button @click="showCategoryModal">新建分类</a-button>
        <a-modal v-model:open="categoryModal" title="新建分类">
            <template #footer></template>
            <a-form
                    :model="formState"
                    @submit="createCategory"
                    autocomplete="off"
            >
                <a-form-item
                        label="分类名称"
                        name="name"
                        :rules="[{ required: true, message: '请输入分类名称' }]"
                >
                    <a-input v-model:value="formState.name"/>
                </a-form-item>
                <a-form-item
                        label="分类描述"
                        name="desc"
                        :rules="[{ required: true, message: '请输入分类描述' }]"
                >
                    <a-input v-model:value="formState.desc"/>
                </a-form-item>


                <a-form-item>
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </a-row>
    <a-row>
        <a-table
                :row-key="record=>record.id"
                style="width: 100%"
                :dataSource="categoryList"
                :pagination="pagination"
                :columns="categoryColumns"
                @change="handleTablePaginationChange"
        >
        </a-table>
    </a-row>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {createCategoryAPI} from "@/api/admin";
import {CategoryReq} from "@/types/request/admin.ts";
import {message} from "ant-design-vue";
import {useCourseStore} from "@/store/modules/course.ts";
import {categoryColumns} from "@/consts/columns.ts";
import {Category} from "@/types/response/course.ts";
import usePager, {Pager} from "@/hooks/pages";

const categoryModal = ref(false)
const useCourse = useCourseStore()

const categoryList = computed(
    () => useCourse.categoryList.slice(pageRange.value[0], pageRange.value[1])
)
const {pagination, pageRange, Max, setMax} = usePager()
useCourse.getCategoryList().then(res => {
    console.log(res?.data.count)
    pagination.total = res?.data.count
})
const formState = reactive<CategoryReq>({
    name: '',
    desc: '',
})
const showCategoryModal = () => {
    categoryModal.value = true
}
const createCategory = async () => {
    try {
        await createCategoryAPI(formState)
        useCourse.addCategory(<Category>formState)
        message.success("创建成功")
    } catch (e) {
        console.log(e)
    }

}
const handleTablePaginationChange = async (pager: Pager) => {
    pagination.current = pager.current
    if (Max.value >= pagination.current) return
    setMax(pagination.current)
    const res = await useCourse.getMoreCategoryList(pagination)
    pagination.total = res.data.count
}
</script>


