<template>
    <transition name="fromRight">
        <div class="add" v-if="addAreaFlag" @click.self="addArea(0)">
            <div class="right">
                <span>添加图片</span>
                <input
                    class="file"
                    type="file"
                    @change="changePicture"
                    accept="image/jpg, image/jpeg, image/png"
                />
                <input
                    type="text"
                    class="file"
                    placeholder="为图片取个别名"
                    v-model.trim="pictureName"
                />
                <img class="preview" :src="upload.picsrc" />
                <button
                    class="btn"
                    :disabled="!upload.picture"
                    @click="upLoadFun"
                >
                    确定
                </button>
                <button class="btn" @click="addArea(0)">关闭</button>
            </div>
        </div>
    </transition>

    <div class="Box flex">
        <div class="tools flex">
            <button class="btn" @click="getPicListFun()">刷新列表</button>
            <button class="btn" @click="addArea(1)">添加图片</button>
            <input placeholder="点击搜素图片" type="text" v-model="keyWord" />
            <button class="btn" @click="List = !List">{{ ListStatus }}</button>
        </div>
        <div class="DocList flex" v-if="List">
            <template v-if="FilPicList.length">
                <div class="center">
                    <Item
                        v-for="item in FilPicList"
                        :key="item.path"
                        :item="item"
                        :ChickFlag="ChickFlag"
                        @getItem="getItem"
                        @getPicListFun="getPicListFun"
                    ></Item>
                </div>
                <PicShow :checkItem="checkItem"></PicShow>
            </template>
            <Zero v-else></Zero>
        </div>

        <DocListPic
            v-else
            :FilPicList="FilPicList"
            @getPicListFun="getPicListFun"
        ></DocListPic>
    </div>
</template>

<script setup>
import { ref, reactive, watchEffect, computed, onMounted } from "vue";
import bus from "@/utils/eventBus";
import { useCounterStore } from "@/stores/user";
import { getPicList, addPicItem } from "@/apis/pictureApi";
import PicShow from "@/components/Home/PicShow.vue";
import DocListPic from "@/components/DocList_Pic.vue";
import Zero from "@/components/zero.vue";
import Item from "@/components/item.vue";

let List = ref(true);
let ListStatus = computed(() => (List.value ? "列表" : "视图"));
let store = useCounterStore();
let ChickFlag = ref("");
let checkItem = ref("");
function getItem(item) {
    ChickFlag.value = item.name;
    checkItem.value = item;
}
let addAreaFlag = ref(0);
function addArea(val) {
    if (PicDocName.value) {
        addAreaFlag.value = val;
    } else {
        openWarning("请选择分组");
    }
}
//
let pictureName = ref("");
const upload = reactive({
    picture: null,
    picsrc: "",
});
async function upLoadFun() {
    let identily = "公共空间";
    let formdata = new FormData();
    formdata.append("file", upload.picture);
    formdata.append(
        "group",
        `${identily}/${store.username}/${PicDocName.value}`
    );
    if (pictureName.value) {
        formdata.append("name", pictureName.value);
    }
    if (identily && store.username && PicDocName) {
        const data = await addPicItem(formdata);
        upload.picsrc = "";
        upload.picture = null;
        openSuccess(data.message);
        getPicListFun();
    }
}
// 成功弹窗
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
// 上传图片预览
function changePicture(event) {
    if (event.target.files[0]) {
        let p = event.target.files[0];
        upload.picture = p;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(p);
        fileReader.onload = ({ target }) => {
            upload.picsrc = target.result;
        };
    } else {
        upload.picsrc = "";
    }
}

// 获取图片列表
let keyWord = ref("");
let PicList = ref([]);
let FilPicList = ref([]);
let PicDocName = ref("");
async function getPicListFun(value = PicDocName.value) {
    let identily = "公共空间";
    let query = `${identily}/${store.username}/${value}`;
    let data = await getPicList(query);
    PicList.value = data.filePaths;
    checkItem.value = "";
    pictureName.value = "";
}
// 监视过滤
watchEffect(() => {
    let fil = PicList.value.filter((item) => {
        if (item.name.indexOf(keyWord.value) != -1) return item;
    });
    FilPicList.value = fil;
});
// 上传图片
// onMounted
onMounted(() => {
    bus.on("ListName", (value) => {
        PicDocName.value = value;
        getPicListFun(value);
    });
});
</script>

<style lang="scss" scoped>
.Box {
    flex-direction: column;
    margin-left: 4px;
    flex: 4;
    .tools {
        background-color: #fff;
        min-height: 50px;
        margin-bottom: 4px;
        justify-content: start;
        button {
            flex: 1;
            margin: 2px 10px;
        }
        input {
            flex: 4;
            margin: 2px 10px;
            border: 0;
            border-bottom: 1px solid var(--color);
            padding: 10px;
        }
    }
    .DocList {
        background-color: #fff;
        flex: 1;
        overflow: hidden;
        .center {
            flex: 1;
            height: 100%;
            overflow: auto;
        }
    }
}

.right {
    padding: 20px;
    overflow: auto;
    span {
        font-size: 20px;
    }
    .file {
        margin: 20px 0;
        padding: 10px;
        width: 100%;
        border: 1px solid var(--bgColor);
        box-shadow: 0 0 5px 2px var(--bgColor) inset;
    }
    .preview {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
    }
    .btn {
        width: 100%;
        margin: 10px 0;
        padding: 10px;
    }
}
</style>