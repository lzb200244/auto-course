<template>
    <a-row style="margin:0 40px;"  >
        <a-col :sm="18" :xs="24">col-12</a-col>
        <a-col :sm="6" :xs="24"  >
                <a-form
                    layout="vertical"
                    :model="formState"
                    @finish="submitRegister"
                >
                    <a-form-item
                        label="用户名"
                        name="username"
                        :rules="[{ required: true, message: '请输入用户名' }]"
                    >
                        <a-input v-model:value="formState.username">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
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
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item
                        label="邮箱"
                        name="email"
                        :rules="[{ required: true, message: '请输入邮箱', type: 'email' }]"
                    >
                        <a-input v-model:value="formState.email"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button  type="primary" html-type="submit" >
                         注 册
                        </a-button>
                        Or
                        <a href="">返回登录</a>
                    </a-form-item>
                </a-form>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import {RegisterReq} from "@/types/request/user.ts";
import {asyncRegister} from "@/api/user";
import {message} from "ant-design-vue";
import index from "@/router";


const formState = reactive<RegisterReq>({
    username: '',
    password: '',
    email:''
});
const submitRegister =  (values: RegisterReq) => {
    asyncRegister(values).then(()=>{
        message.success("注册成功");
        index.push("login")
    })
};



</script>
<style scoped>

</style>
