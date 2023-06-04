<template>
    <div class="DocList flex">
        <template v-if="props.FilPicList.length">
            <div  class="center flex">
                <div v-hight  class="li" v-for="List in Lists">
                    <div class="item" v-for="item in List" :key="item.name">
                        <a class="picture" :href="item.path" target="_block">
                            <img :src="item.path" alt="" />
                        </a>
                        <div class="word flex">
                            <a
                                class="btn copylink"
                                @click.stop="useCopylink(item.path)"
                                v-text="item.name"
                            ></a>
                            <a class="btn" @click.stop="deleteItem(item.path)"
                                >删除</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <Zero v-else></Zero>
    </div>
</template>

<script setup>
import Zero from "@/components/zero.vue";
import useCopylink from "@/hooks/useCopylink";
import { delPicItem } from "@/apis/pictureApi";
import { watchEffect, ref, reactive, defineProps, onMounted } from "vue";
//
const vHight = {
    mounted:(el)=>{
        // console.log(el.offsetHeight)
    }
}
//
const data = reactive({
    list:[[],[],[],[]]
});
onMounted(()=>[
    // console.log(props.FilPicList[0])
])

//
const props = defineProps(["FilPicList"]);
const Lists = reactive({
    list1: [],
    list2: [],
    list3: [],
    list4: [],
});
watchEffect(() => {
    Lists.list1 = [];
    Lists.list2 = [];
    Lists.list3 = [];
    Lists.list4 = [];
    for (let i = 0; i < props.FilPicList.length; i++) {
        if ((i + 5) % 4 == 1) Lists.list1.push(props.FilPicList[i]);
        if ((i + 5) % 4 == 2) Lists.list2.push(props.FilPicList[i]);
        if ((i + 5) % 4 == 3) Lists.list3.push(props.FilPicList[i]);
        if ((i + 5) % 4 == 0) Lists.list4.push(props.FilPicList[i]);
    }
});

const emit = defineEmits(["getPicListFun"]);
let flag = ref(true);
async function deleteItem(path) {
    let pathD = path.slice(33);
    try {
        let data = await delPicItem(pathD);
        openSuccess(data.message);
        emit("getPicListFun");
    } catch (e) {
        openError(e);
    }
}
// 成功弹窗
const openSuccess = (value) => {
    ElMessage({
        message: value,
        type: "success",
    });
};
const openError = (value) => {
    ElMessage.error(value);
};
</script>

<style lang="scss" scoped>
.DocList {
    background-color: #fff;
    flex: 1;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 5px;
    .center {
        height: 100%;
        width: 100%;
        background-color: var(--gray);
        overflow: auto;
        flex-direction: row;
        .li {
            margin: 2px;
            flex: 1;
            .item {
                padding: 5px;
                margin: 5px 2px;
                overflow: hidden;
                border-radius: 5px;
                background-color: #fff;
                .word {
                    justify-content: space-between;
                    .copylink:hover::after {
                        content: "复制链接";
                        padding: 5px;
                    }
                    .btn {
                        color: var(--black);
                        border: 0;
                    }
                }
                .picture {
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                    }
                }
            }
            .item:hover {
                box-shadow: 0 0 5px 2px var(--color);
            }
        }
    }
}
</style>