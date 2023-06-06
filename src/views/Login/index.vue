<template>
    <div class="Login">
        <div class="center">
            <div class="Left">
                <div class="title">广告位招租</div>
            </div>
            <div class="Right">
                <div class="title flex">
                      <div>登录</div>
                </div>
                <!-- 登录 -->
                    <input
                        type="text"
                        placeholder="请输入用户名"
                        name=""
                        v-model.trim="username"
                    />
                    <input
                        type="password"
                        placeholder="请输入密码"
                        name=""
                        v-model.trim="password"
                    />
                    <button class="btn" @click="login" :disabled="canSub">
                        登录
                    </button>
                <!-- 注册 -->
                <Loading v-if="!loading"></Loading>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Login, Sign } from "@/apis/userApi";
import Loading from '@/components/loading.vue'
import {openSuccess , openError} from '@/hooks/usePOP'

let username = ref("");
let password = ref("");
let loading = ref(true);
const router = useRouter();

let canSub = computed(
    () => !(username.value && password.value && loading.value)
);

function clear() {
    username.value = "";
    password.value = "";
}

// 登录
async function login() {
        loading.value = false;
    let postData = { username: username.value, password: password.value };
    try {
        const data = await Login(postData);
        openSuccess("登录成功");
        loading.value = true;
        clear();
        if (data.token) {
            localStorage.setItem("token", data.token);
            router.push("/main");
        } else {
            localStorage.removeItem("token");
        }
    } catch (e) {
        console.log(e);
        loading.value = true;
        clear();
        openError("登陆失败");
    }
}


</script>

<style lang="scss" scopeds>
.Login {
    display: flex;
    padding: 200px;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .center {
        display: flex;
        // aspect-ratio:8/3;
        width: 800px;
        height: 400px;
        background-color: rgba(255, 255, 255, 0.9);
    }
    .Left {
        padding: 10% 0;
        border-right: 3px dotted var(--gray);
        width: 0;
        overflow: hidden;
        flex: 6;
        text-align: center;
        .title {
            color: var(--color);
            font-size: 40px;
        }
    }
    .Right {
        flex: 4;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        .title{
            width: 100%;
            padding: 20px;
            justify-content: space-between;
            div{
                font-size: 20px;
            }
            span{
                font-size: 14px;
                color:var(--black);
            cursor:pointer; 
        }
        }
        .btn {
            color: var(--black);
            border: 0;
            margin-top: 15px;
        }
        input,
        .btn {
            width: 80%;
            height: 40px;
            padding: 0 5px;
            border: 1px solid var(--color);
            margin: 10px 0;
        }
        .btn:disabled {
            background-color: var(--gray);
        }
        div {
            color: var(--color);
            font-size: 20px;
        }
    }
}
</style>
