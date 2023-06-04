<template>
    <div class="About">
        <button class="btn" @click="back">返回</button>
    <div class="center">关于我们:cutelargeCarrot</div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
let router = useRouter();
function back() {
    router.back();
}
</script>

<style lang="scss" scoped>
.About{
    margin: 20px;
    flex: 1;
    // overflow: hidden;
    .btn{
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
    }
    .center{
        background-color: var(--background);
        height: calc(100% - 50px);
        padding: 20px;
        font-size: 20px;
    }
}
</style>