<template>
    <a-row style="margin:0 40px;">
        <a-col :sm="18" :xs="24">col-12</a-col>
        <a-col :sm="6" :xs="24">
            <a-form
                    layout="vertical"
                    :model="formState"
                    @finish="submitLogin"
            >
                <a-form-item
                        label="用户名"
                        name="username"
                        :rules="[{ required: true, message: '请输入用户名' }]"
                >
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon"/>
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                        label="密码"
                        name="password"
                        :rules="[{ required: true, message: '请输入密码' }]"
                >
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon"/>
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">
                        登 录
                    </a-button>
                    <router-link to="/register">注册</router-link>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {UserReq} from "@/types/request/user.ts";
import {asyncLogin} from "@/api/user";
import {useUserStore} from "@/store/modules/user.ts";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import {setToken} from "@/utils/cookies.ts";

const {setUser} = useUserStore();
const router = useRouter()
const formState = reactive<UserReq>({
    username: 'admin',
    password: 'admin',
});

const submitLogin = async(values: UserReq) => {
    try {
        const res=await asyncLogin(values)
        setUser(res.data)
        // 存储token
        setToken('access_token', <string>res.data.access_token)
        message.success("登录成功")
        await router.push({
            path: <string>router.currentRoute.value.query.next ?? '/'
        })
    }catch (e){
        console.log(e)
    }

};


</script>
<style scoped>

</style>
