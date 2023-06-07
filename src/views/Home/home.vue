<template>
    <div class="Home">
        <div class="title">{{ sayTime }} {{ store.username }}</div>
        <div class="center flex">
            <div class="btn flex" @click="jump('/main/center')">进入空间</div>
            <div class="btn flex" @click="jump('/main/about')">关于</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/user";
import useGetTime from "@/hooks/useGetTime";
const store = useCounterStore();
let router = useRouter();
let sayTime = ref("");

function jump(val) {
    router.push(val);
}
onMounted(() => {
    sayTime.value = useGetTime();
});
</script>

<style lang="scss" scoped>
.Home {
    flex: 1;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    background: linear-gradient(
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
        ),
        url("@/assets/imgs/logo_blue.png") no-repeat 50% 50%/ 40% 40%;

    .title {
        margin: 10px 20px;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        color: var(--color);
        text-align: center;
        border-bottom: 1px solid var(--color);
    }
    .center {
        height: calc(100% - 150px);
        padding: 50px 20px;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .btn {
            width: 250px;
            height: 50px;
            font-size: 40px;
            justify-content: center;
            align-items: center;
            transition: all 1s;
            border: 0;
            background-color: rgba(255, 255, 255, 0.1);
            border-left: 4px solid var(--color);
            border-right: 4px solid var(--color);
        }
        .btn:hover {
            height: 100px;
            width: 100%;
            opacity: 0.6;
            border-left: 2px solid var(--color);
            border-right: 2px solid var(--color);
            border: 2px solid rgba(151, 189, 255, 0.5);

             background: linear-gradient(
                rgba(151, 167, 255, 0.5),
                rgba(135, 189, 255, 0.5)
            );
        }
    }
}
</style>