<template>
    <a-card :bordered="false">
        <a-tooltip placement="topLeft" title="修改头像">
            <a-upload
                    name="avatar"
                    style="cursor: pointer"
                    :show-upload-list="false"
                    :before-upload="handleBeforeUpload"
                    :custom-request="beforeUpload"
            >
                <a-avatar :src="user.avatar " :size="85"/>
            </a-upload>
        </a-tooltip>
        <p style="float: right">
            <a-button type="link" @click="updateInfo">
                <EditOutlined/>
                Edit
            </a-button>
        </p>
        <a-divider/>
        <a-space direction="vertical" style="width: 100%">

            <p>昵称：{{ user.name }}</p>
            <p>性别：{{ user.sex }}</p>
            <p>邮箱：{{ user.email }}</p>
            <p>职责：
                <a-tag v-for="role in user.roles" :key="role">
                    {{ role }}
                </a-tag>
            </p>
            <p>我的描述：{{ user.desc }}</p>
        </a-space>
    </a-card>
    <a-modal v-model:open="open" title="修改信息" @ok="handleOk">

        <a-form :model="formState">

            <a-form-item label="名字">
                <a-input v-model:value="formState.name"/>
            </a-form-item>
            <a-form-item label="邮箱">
                <a-input v-model:value="formState.email"/>
            </a-form-item>
            <a-form-item label="性别">
                <a-radio-group v-model:value="formState.sex">
                    <a-radio :value="0" name="type">男</a-radio>
                    <a-radio :value="1" name="type">女</a-radio>
                    <a-radio :value="2" name="type">保密</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="描述">
                <a-textarea v-model:value="formState.desc"/>
            </a-form-item>
            <a-form-item>
                <a-button style="float: right" type="primary" @click="handleOk">更 新</a-button>
            </a-form-item>
        </a-form>
        <template #footer></template>
    </a-modal>

</template>

<style scoped>

</style>
<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useUserStore} from "@/store/modules/user.ts";
import {UpdateInfoReq} from "@/types/request/user.ts";
import {message} from "ant-design-vue";
import {EditOutlined} from "@ant-design/icons-vue";
import useQiniu from "@/utils/qiniu/cos.ts";
import {getKodo} from "@/api/credit";
import {createValidateFileExtension, ImageTypes, isOverSize} from "@/utils/file/valid.ts";

defineOptions({
    name: "my"
});
const open = ref<boolean>(false);
const userStore = useUserStore();
const user = computed(() => userStore.user)
const formState = reactive<UpdateInfoReq>({
    name: '',
    email: '',
    sex: 1,
    desc: '',
    avatar: ''
})
const updateInfo = () => {
    open.value = true
    Object.assign(formState, user.value)
}
const handleOk = async () => {
    try {
        await userStore.updateInfo(formState)
        open.value = false;
        message.success("更新成功")
    } catch (e) {
        message.success('更新失败')
    }
}
/**
 * 文件类型校验
 * @param file
 */
const handleBeforeUpload = (file: File) => {
    // 可以在这里对上传的文件进行校验，例如文件类型、文件大小限制等
    let valid = createValidateFileExtension(ImageTypes);
    if (isOverSize(file.size, 5)) {
        message.info('图片大小不能超过5mb');
        return;
    }
    if (!valid(file.name)) {
        message.info(`名叫${file.name}并非图片类型`);
        return false;
    }
    return true;
};
const beforeUpload = async (file: any) => {
    const res = await getKodo()
    const {upload} = useQiniu(res.data)
    Object.assign(formState, user.value)
    formState.avatar = upload(file.file)
    await handleOk()
};
</script>
