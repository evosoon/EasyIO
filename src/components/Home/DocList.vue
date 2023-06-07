<template>
    <!-- 右弹窗 -->
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
    <!-- 主体 -->
    <div class="Box flex">
        <!-- 工具栏 -->
        <div class="tools flex">
            <button class="btn" @click="getPicListFun()">刷新列表</button>
            <button class="btn" @click="addArea(1)">添加图片</button>
            <input placeholder="点击搜素图片" type="text" v-model="keyWord" />
            <button class="btn" @click="List = !List">{{ ListStatus }}</button>
        </div>
        <!-- 列表区域 -->
        <div class="DocList flex" v-if="List">
            <template v-if="FilPicList.length">
                <div class="center">
                    <!-- 列表Item -->
                    <Item
                        v-for="item in FilPicList"
                        :key="item.path"
                        :item="item"
                        :ChickFlag="ChickFlag"
                        @getItem="getItem"
                        @getPicListFun="getPicListFun"
                    ></Item>
                </div>
                <!-- 图片展示 -->
                <PicShow :checkItem="checkItem"></PicShow>
            </template>
            <!-- 判断列表为空 -->
            <Zero v-else></Zero>
        </div>
        <!-- 视图列表 -->
        <DocListPic
            v-else
            :FilPicList="FilPicList"
            @getPicListFun="getPicListFun"
        ></DocListPic>
    </div>
</template>

<script setup>
import PicShow from "@/components/Home/PicShow.vue";
import DocListPic from "@/components/Home/DocList_Pic.vue";
import Zero from "@/components/zero.vue";
import Item from "@/components/item.vue";

import { ref, reactive, watchEffect, computed, onMounted } from "vue";
import { useCounterStore } from "@/stores/user";
import { getPicList, addPicItem } from "@/apis/pictureApi";
import { openSuccess, openError } from "@/hooks/usePOP";
import bus from "@/utils/eventBus";

let store = useCounterStore();

// 模式切换
let List = ref(true);
let ListStatus = computed(() => (List.value ? "列表模式" : "视图模式"));

// 选中的图片
let ChickFlag = ref("");
let checkItem = ref("");
function getItem(item) {
    ChickFlag.value = item.name;
    checkItem.value = item;
}

// 添加图片
let addAreaFlag = ref(0);
function addArea(val) {
    if (PicDocName.value) {
        addAreaFlag.value = val;
    } else {
        openError("请选择分组");
    }
}

// 上传涂片
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
let PicList = ref([]);
let FilPicList = ref([]);

let keyWord = ref("");
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
            border: 1px solid transparent;
            outline: 0;
            border-bottom: 1px solid var(--color);
            padding: 10px;
            min-width: 100px;
            transition: all 1s;
        }
        input:focus {
            border: 1px solid var(--color);
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
        height: 48px;
        border: 1px solid var(--bgColor);
        outline: 0;
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
@media screen and (max-width: 950px) {
    .Box {
        margin: 0;
        width: 100%;
        height: calc(100% - 200px);
        .tools {
            background-color: #fff;
            height: 50px;
            margin: 2px 0;
            padding: 0 5px;
            .btn {
                flex: 1;
                min-width: 40px;
                max-width: 40px;
                margin: 2px;
                padding: 2px;
            }
        }
        .DocList {
            width: 100%;
            overflow: hidden;
            .center {
                overflow: auto;
                margin-bottom: 100px;
            }
        }
    }

    .right {
        padding: 20px;
        overflow: auto;
        height: 100%;
        background-color: var(--background);
        position: relative;
        z-index: 100;
        span {
            font-size: 20px;
        }
    }
}

@media screen and (max-width: 600px) {
    .Box {
      
        .DocList {
            width: 100%;
            overflow: hidden;
                display: flex;
                flex-direction: column-reverse;
                justify-content: center;
            .center {
                width: 100%;
                overflow: auto;
                margin-bottom: 100px;
            }
        }
    }
}
</style>