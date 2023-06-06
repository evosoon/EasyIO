<template>
    <div class="flex box">
        <HomeLeft></HomeLeft>
        <HomeRight></HomeRight>
    </div>
</template>

<script setup>
import HomeLeft from "@/components/Home/HomeLeft.vue";
import HomeRight from "@/components/Home/HomeRight.vue";
import { useCounterStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
// 获取用户信息
function getUserInfo() {
    const store = useCounterStore();
    store.setUsername('root');
}
onMounted(() => {
    getUserInfo();
});
</script>

<style lang="scss" scoped>
.box {
    flex-direction: row;
    height: 100vh;
}
</style>