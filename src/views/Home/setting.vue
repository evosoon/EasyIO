<template>
    <div class="box flex">
        <div class="center flex">
            <div>这是设置页面</div>
            <div>暂无内容</div>
            <button class="btn" @click="jump">点击跳转至首页</button>
        </div>
    </div>
</template>

<script setup >
import { useRouter } from "vue-router";
let router = useRouter();
function jump() {
    router.push("/main");
}
</script>

<style lang="scss" scoped>
.box {
    justify-content: center;
    align-items: center;
    height: 100vh;
    .center {
        margin: 10px;
        padding: 5% 20%;
        background-color: var(--background);
        flex-direction: column;
        align-items: center;
        div{
            font-size: 20px;
            margin: 10px;
        }
        .btn{
            padding: 5px;
        }
    }
}
</style>