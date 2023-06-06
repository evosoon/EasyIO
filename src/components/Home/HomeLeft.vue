<template>
    <div class="Left flex">
        <div class="main flex">
            <span class="user" @click="jump('/main/user')"
                ><img src="@/assets/icon/customer-center.png"
            /></span>
            <span class="home" @click="jump('/main/')"
                ><img src="@/assets/icon/home.png"
            /></span>
            <span class="home" @click="jump('/main/about')"
                ><img src="@/assets/icon/about.png"
            /></span>
            <span class="home" @click="jump('/main/setting')"
                ><img src="@/assets/icon/settings.png"
            /></span>
            <span class="exit" @click="[jump('/login'), outLogin()]"
                ><img src="@/assets/icon/exit.png"
            /></span>
        </div>
        <div><img src="@/assets/imgs/logo_white.png" alt="" /></div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
let router = useRouter();

// 路由跳转
function jump(val) {
    router.push(val);
    // 退出登录
}
function outLogin() {
    localStorage.removeItem("token");
}
</script>

<style lang="scss" scoped>
.Left {
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 60px;
    min-width: 60px;
    background-color: var(--barColor);
    box-shadow: -1px 0 5px 1px var(--black);
    div {
        img {
            width: 60px;
        }
    }
    .main {
        flex-direction: column;
        span {
            cursor: pointer;
            margin: 5px;
            padding: 10px;
            border-radius: 10px;
            position: relative;
        }
        span:hover {
            box-shadow: 0 0 2px 1px var(--background);
        }
        img {
            width: 30px;
        }
    }
    img {
        width: 30px;
    }
}
</style>