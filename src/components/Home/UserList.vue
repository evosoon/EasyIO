<template>
    <!-- 右弹窗 -->
    <transition name="fromRight">
        <div class="add" v-if="addAreaFlag" @click.self="addArea(false)">
            <div class="right">
                <input
                    placeholder="输入分组名称"
                    type="text"
                    v-model="newDocName"
                />
                <button class="btn" @click="addDoc" :disabled="!newDocName">
                    提交
                </button>
                <button class="btn" @click="addArea(false)">关闭</button>
            </div>
        </div>
    </transition>
    <!-- 全屏弹窗 -->
    <teleport to="body" v-if="delAreaFlag">
        <div class="POP flex">
            <div>
                <p>
                    确实删除 [ {{ delDocName }} ] ?删除后
                    此分区及其中的内容将不复存在
                </p>
                <button class="btn del" @click="delDoc(delDocName)">
                    删除
                </button>
                <button class="btn close" @click="delAreaFlag = false">
                    取消
                </button>
            </div>
        </div>
    </teleport>
    <!-- 主体 -->
    <div class="UserList flex">
        <span>{{ store.username }}</span>
        <div class="btn title" @click="getListFunc()">刷新</div>
        <div class="btn title" @click="addArea(true)">创建分组</div>
        <div class="List">
            <div
                v-for="item in List"
                :key="item.name"
                @click.self="Jump(item.name)"
                :class="{ chickClass: item.name == ChickFlag }"
                class="btn item"
            >
                {{ item.name }}
                <button class="btn delbtn" @click.self="delArea(item.name)">
                    删除
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useCounterStore } from "@/stores/user";
import { getList, addList, delList } from "@/apis/pictureApi";
import { openSuccess, openError } from "@/hooks/usePOP";
import bus from "@/utils/eventBus.js";

let store = useCounterStore();
let List = ref([]);

// 添加文件夹
let addAreaFlag = ref(false);
let newDocName = ref("");

function addArea(val) {
    addAreaFlag.value = val;
}

// 删除文件夹
let delAreaFlag = ref(false);
let delDocName = ref("");

function delArea(val) {
    delAreaFlag.value = true;
    delDocName.value = val;
}

let ChickFlag = ref("");

watch(
    () => store.username,
    () => {
        getListFunc();
    }
);

// addList
async function addDoc() {
    let identily = "公共空间";
    let newgroup = `${identily}/${store.username}/${newDocName.value}`;
    let value = { name: newgroup };
    try {
        const data = await addList(value);
        openSuccess(data.message);
        getListFunc();
    } catch (e) {
        console.log(e);
    }
}

// delList
async function delDoc(value) {
    delAreaFlag.value = false;
    let identily = "公共空间";
    let path = `${identily}/${store.username}/${value}`;
    try {
        const data = await delList(path);
        openSuccess(data.message);
        getListFunc();
    } catch (e) {
        console.log(e);
    }
}

// getList
async function getListFunc(userVal = store.username) {
    try {
        ChickFlag.value = "";
        let identily = "公共空间";
        let name = userVal;
        let group = `${identily}/${name}`;
        let data = await getList(group);
        List.value = data.dirPaths;
        Jump();
    } catch (e) {
        console.log(e);
    }
}

function Jump(val = null) {
    ChickFlag.value = val;
    bus.emit("ListName", val);
}

onMounted(() => {
    getListFunc();
});
</script>

<style lang="scss" scoped>
.UserList {
    flex-direction: column;
    height: 100%;
    background-color: var(--background);
    overflow: hidden;
    span {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: var(--background);
        background-color: var(--color);
        box-shadow: 0 0px 5px 1px var(--black);
        opacity: 0.8;
        margin-bottom: 5px;
    }
    .title {
        height: 40px;
        line-height: 40px;
    }
    .List {
        flex: 1;
        height: 100%;
        overflow: auto;
        .item {
            display: flex;
            padding: 5px;
            height: 40px;
            line-height: 30px;
            margin: 0;
            justify-content: space-between;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .delbtn {
                background-color: transparent;
                height: 30px;
                border: 0;
                margin: 0;
                padding: 0 5px;
            }
            .delbtn:hover {
                background-image: linear-gradient(
                    0deg,
                    rgb(226, 119, 119),
                    rgb(255, 109, 109)
                );
                color: var(--background);
                box-shadow: 0 0 0 0;
            }
        }
    }
}
.chickClass {
    background-color: var(--bgColor);
}
.right {
    padding: 20px;
    input,
    .btn {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin: 20px 0;
        border-radius: 5px;
    }
    input {
        height: 60px;
        outline: 0;
        padding: 10px;
        border: 2px solid var(--bgColor);
    }
}
.POP {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(235, 235, 235, 0.5);
    div {
        border: rgb(255, 116, 116);
        background-color: rgba($color: #ffe7e7, $alpha: 0.4);
        padding: 50px 75px;
        border-radius: 5px;
        box-shadow: 0 0 5px 1px rgb(255, 116, 116);
        transition: all 1s;
        button {
            margin: 5%;
            background-color: #fff;
            width: 40%;
            padding: 10px 20px;
            color: var(--black);
            border: 1px solid var(--gray);
        }
        .del {
            border: 1px solid rgb(255, 116, 116);
            color: rgb(255, 116, 116);
        }
        .del:hover {
            background-image: linear-gradient(0deg, #ff8f8f, #ff9f9f);
        }
        .close:hover {
            background-image: linear-gradient(0deg, #cdcdcd, #cacaca);
        }
    }
    div:hover {
        padding: 55px 85px;
        font-size: 20px;
        button {
            padding: 15px 25px;
        }
    }
}

@media screen and (max-width: 950px) {
    .UserList {
        height: 100%;
        width: 100%;
        background-color: var(--background);
        overflow: hidden;
        display: block;
        span {
            display: inline-block;
            height: 48px;
            width: calc(100% - 220px);
            line-height: 48px;
            overflow: hidden;
            text-align: center;
            color: var(--color);
            background-color: var(--background);
            box-shadow: 0px 0px 4px 2px var(--gray);
            opacity: 0.8;
            margin-bottom: 5px;
            margin: 2px;
        }
        .title {
            float: right;
            height: 50px;
            width: 100px;
            line-height: 50px;
            margin: 0 2px;
        }
        .List {
            overflow: hidden;
            height: calc(100% - 50px);
            overflow: auto;
            .item {
                display: flex;
                padding: 5px;
                height: 40px;
                line-height: 30px;
                margin: 0;
                justify-content: space-between;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                .delbtn {
                    background-color: transparent;
                    height: 30px;
                    border: 0;
                    margin: 0;
                    padding: 0 5px;
                }
                .delbtn:hover {
                    background-image: linear-gradient(
                        0deg,
                        rgb(226, 119, 119),
                        rgb(255, 109, 109)
                    );
                    color: var(--background);
                    box-shadow: 0 0 0 0;
                }
            }
        }
    }
    .chickClass {
        background-color: var(--bgColor);
    }
    .right {
        position: relative;
        z-index: 100;
        padding: 20px;
        background-color: var(--background);
        height: 100%;
    }
    .POP {
        div {
            background-color: rgba($color: #ffe7e7, $alpha: 0.9);
            button {
                width: 100px;
            }
            button:hover {
                width: 100px;
            }
        }
    }
}
</style>