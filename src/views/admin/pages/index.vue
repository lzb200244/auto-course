<template>
    <a-row :gutter="[16,16]">
        <a-col :md="12">
            <a-card :bordered="false">

                <template #title>
                    新增页面：
                    <a-radio-group v-model:value="radio">
                        <a-radio-button :value="1">新增父组件</a-radio-button>
                        <a-radio-button :value="2">新增子组件</a-radio-button>
                    </a-radio-group>
                </template>
                <a-form :model="formState" :label-col="labelCol"
                        ref="formRef"
                        :wrapper-col="wrapperCol">
                    <a-form-item label="页面名称"
                                 name="name"
                                 :rules="[{ required: true, message: '请输入页面名称' },]">
                        <a-input v-model:value="formState.name"/>
                    </a-form-item>
                    <a-form-item

                            name="path" label="页面路由" :rules="[{ required: true, message: '请输入页面路由' }]">
                        <a-input v-model:value="formState.path"/>
                    </a-form-item>
                    <a-form-item
                            v-if="radio === 1"
                            :rules="[{ required: true, message: '请输入重定向地址' }]"
                            label="重定向地址">
                        <a-input v-model:value="formState.redirect"/>
                    </a-form-item>
                    <a-form-item
                            v-if="radio === 2"
                            :rules="[{ required: true, message: '请输入组件地址' }]"
                            label="组件地址">
                        <a-input v-model:value="formState.component"/>
                    </a-form-item>
                    <a-form-item
                            label="组件标题">
                        <a-input v-model:value="formState.meta.title"/>
                    </a-form-item>
                    <a-form-item
                            label="是否禁用">
                        <a-switch v-model:checked="formState.disable"/>
                    </a-form-item>
                    <a-form-item
                            label="是否需要认证">
                        <a-switch v-model:checked="formState.meta.requireAuth"/>
                    </a-form-item>
                    <a-form-item
                            label="是否缓存">
                        <a-switch v-model:checked="formState.meta.keepAlive"/>
                    </a-form-item>
                    <a-form-item name="limit" label="属于" :rules="[{ required: true, message: '请输入属于关系' }]">
                        <a-radio-group v-model:value.number="formState.limit">
                            <a-radio :value="1">学生</a-radio>
                            <a-radio :value="2">教师</a-radio>
                            <a-radio :value="3">管理员</a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <a-form-item
                            v-if="radio === 2"
                            name="parent"
                            label="父组件" :rules="[{ required: true, message: '请输入父组件' }]">
                        <a-input v-model:value.number="formState.parent" type="number"/>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" @click="submitForm">提交</a-button>
                    </a-form-item>
                </a-form>

            </a-card>
        </a-col>
        <a-col :md="12">
            <a-card title="页面关系图" :bordered="false">
                <a-list item-layout="horizontal" :data-source="myPages">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-list-item-meta
                            >
                                <template #title>
                                    父组件：{{ item.name }}
                                </template>
                                <template #description>
                                    所管理的页面：

                                    <a-tag
                                            @click="modifymyPages(child)"
                                            v-for="child in item.children" :key="child">
                                        <a-tooltip>
                                            <template #title>点击修改</template>

                                            {{ child.name }}
                                        </a-tooltip>
                                    </a-tag>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-card>
        </a-col>
    </a-row>
    <a-modal v-model:open="open" @ok="submitUpdateForm">
        <a-form :model="updateForm" :label-col="labelCol"
                ref="updateFormRef"
                :wrapper-col="wrapperCol">
            <a-form-item label="页面名称"
                         name="name"
                         :rules="[
            { required: true, message: '请输入页面名称' },
        ]"
            >
                <a-input v-model:value="updateForm.name"/>
            </a-form-item>
            <a-form-item name="path" label="页面路由" :rules="[{ required: true, message: '请输入页面路由' }]">
                <a-input v-model:value="updateForm.path"/>
            </a-form-item>
            <a-form-item
                    label="重定向地址">
                <a-input v-model:value="updateForm.redirect"/>
            </a-form-item>
            <a-form-item

                    label="组件地址">
                <a-input v-model:value="updateForm.component"/>
            </a-form-item>
            <a-form-item
                    label="组件标题">
                <a-input v-model:value="updateForm.meta.title"/>

            </a-form-item>
            <a-form-item
                    label="是否禁用">
                <a-switch v-model:checked="updateForm.disable"/>
            </a-form-item>
            <a-form-item
                    label="是否需要认证">
                <a-switch v-model:checked="updateForm.meta.requireAuth"/>
            </a-form-item>
            <a-form-item
                    label="是否缓存">
                <a-switch v-model:checked="updateForm.meta.keepAlive"/>
            </a-form-item>
            <a-form-item name="limit" label="属于" :rules="[{ required: true, message: '请输入属于关系' }]">
                <a-radio-group v-model:value.number="updateForm.limit">
                    <a-radio :value="1">学生</a-radio>
                    <a-radio :value="2">教师</a-radio>
                    <a-radio :value="3">管理员</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item
                    name="parent"
                    label="父组件" :rules="[{ required: true, message: '请输入父组件' }]">
                <a-input v-model:value="updateForm.parent" type="number"/>
            </a-form-item>
            <a-form-item >
                <a-button type="primary" @click="submitForm">提交</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
import {computed, reactive, ref, watch} from 'vue';
import {Route} from "@/types/request/admin.ts";
import {createPage, updatePage} from "@/api/admin";
import {message} from "ant-design-vue";
import {usePermissionStore} from "@/store/modules/permission.ts";

const radio = ref(1)
const usePermission = usePermissionStore()
const myPages = computed(() => usePermission.myPages)
const formState = reactive<Route>(
    {
        path: '',
        redirect: '', component: "", name: "",
        meta: {
            requireAuth: false,
            title: '',
            keepAlive: false,
        },
        disable: false,
        parent: 1,
        limit: 0
    }
);
const updateForm = reactive<Route>(
    {
        path: '',
        redirect: '', component: "", name: "",
        meta: {
            requireAuth: false,
            title: '',
            keepAlive: false,
        },
        disable: false,
        parent: 1,
        limit: 0
    }
);
const formRef = ref();
const updateFormRef = ref();

const submitForm = async () => {
    formRef.value.validate().then(async () => {
        await createPage(formState)
        Object.assign(formState, {
            name: '',
            path: '',
            redirect: '',
            component: '',
            meta: {requireAuth: false, title: '', keepAlive: false}
        })
        message.success('新增成功')
    })

}
watch(radio, () => {
    if (radio.value === 1) {
        formState.parent = 1
        formState.component = ''
    } else {
        formState.redirect = ''
    }
})
const open = ref(false)
const modifymyPages = (child: any) => {
    open.value = true
    Object.assign(updateForm, child)
}
const submitUpdateForm = async () => {
    updateFormRef.value.validate().then(async () => {
        await updatePage(updateForm)
    })
}
const labelCol = {style: {width: '150px'}};
const wrapperCol = {span: 14};
</script>

