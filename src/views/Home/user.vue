<template>
    <div class="UserCenter">
        <div>
            <div class="title">用户信息</div>
            <div class="info">用户名：{{ store.username }}</div>
        </div>

        <div class="title flex">
            文件信息<button class="btn" @click="getListFunc()">刷新</button>
        </div>
        <div class="info">文件夹数:{{ List.length }}</div>
        <div class="info">总图片数:{{ picture }}</div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useCounterStore } from "@/stores/user";
import { getList, getPicList } from "@/apis/pictureApi";

const store = useCounterStore();

// 文件夹
let List = ref([]);
// 图片
let picture = ref(0);

// 获取用户 文件夹及图片
async function getListFunc(userVal = store.username) {
    let identily = "公共空间";
    let name = await userVal;
    let group = `${identily}/${name}`;
    let data = await getList(group);
    List.value = data.dirPaths;
    picture.value = 0;

    for (let i = 0; i < data.dirPaths.length; i++) {
        let group = `${identily}/${name}/${List.value[i].name}`;
        let data2 = await getPicList(group);
        picture.value = picture.value + data2.filePaths.length;
    }
}

onMounted(() => {
    getListFunc();
});
</script>

<style lang="scss" scoped>
.UserCenter {
    flex: 1;
    background-color: var(--background);
    margin: 20px;
    padding: 50px 20%;
    overflow: auto;
    background: linear-gradient(
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
        ),
        url("@/assets/imgs/logo_blue.png") no-repeat 70% 80%/ 30% 30%;

    .title {
        font-size: 20px;
        color: var(--color);
        margin: 10px;
        padding: 10px 0;
        border-bottom: 1px solid var(--bgColor);
        justify-content: space-between;
        .btn {
            text-align: center;
            padding: 5px 5px;
            width: 100px;
            border: 1px solid var(--bgColor);
        }
    }
    .info {
        font-size: 20px;
        margin: 20px;
        padding: 20px 0;
    }
}
@media screen and (max-width: 600px) {

    .UserCenter{
        padding: 50px 10%;
          background: linear-gradient(
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
        ),
        url("@/assets/imgs/logo_blue.png") no-repeat 50% 50%/ 40% 20%;
    }
    
}
</style>