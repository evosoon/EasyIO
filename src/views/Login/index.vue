<template>
    <div class="Login">
        <div class="center">
            <div class="Left">
                <div class="title">广告位招租</div>
            </div>
            <div class="Right">
                <div>{{ title }}</div>
                <span @click="change()">切换至{{ changeTitle }}</span>
                <!-- 登录 -->
                <template v-if="isLogin">
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
                    <div id="message">{{ message }}</div>
                    <button class="btn" @click="login" :disabled="canSub">
                        登录
                    </button>
                </template>
                <!-- 注册 -->
                <template v-if="!isLogin">
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
                    <input
                        type="text"
                        placeholder="请输入手机号"
                        name=""
                        v-model.trim="phone"
                    />
                    <div id="message">{{ message }}</div>
                    <button class="btn" @click="signIn" :disabled="cansign">
                        注册
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Login, Sign } from "@/apis/userApi";

let username = ref("");
let password = ref("");
let loading = ref(true);
let phone = ref("");
let message = ref("");
const router = useRouter();

let isLogin = ref(true);

let title = computed(() => {
    return isLogin.value ? "登录" : "注册";
});
let changeTitle = computed(() => {
    return isLogin.value ? "注册" : "登录";
});
let canSub = computed(
    () => !(username.value && password.value && loading.value)
);
let cansign = computed(
    () => !(username.value && password.value && phone.value && loading.value)
);

function change() {
    isLogin.value = !isLogin.value;
    clear();
}
function clear() {
    username.value = "";
    password.value = "";
    phone.value = "";
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
        openWarning("登陆失败");
    }
}

// 注册
async function signIn() {
    loading.value = false;
    let info = {
        username: username.value,
        password: password.value,
        phone_num: phone.value,
    };
    try {
        const data = await Sign(info);
        loading.value = true;
        openSuccess(data.message);
        clear();
    } catch (e) {
        loading.value = true;
        openWarning("注册失败");
        console.log(e);
        clear();
    }
}
const openSuccess = (value) => {
    ElMessage({
        message: value,
        type: "success",
    });
};
// 警告弹窗
const openWarning = (value) => {
    ElMessage({
        message: value,
        type: "warning",
    });
};
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
