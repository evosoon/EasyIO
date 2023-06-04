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
                确实删除 [ {{ delDocName }} ] ?删除后
                此分区及其中的内容将不复存在
                <button class="btn del" @click="delDoc(delDocName)">删除</button>
                <button class="btn" @click="delAreaFlag = false">取消</button>
            </div>
        </div>
    </teleport>

    <div class="UserList flex">
        <span>{{ store.username }}</span>
        <div class="btn" @click="getListFunc()">刷新</div>
        <div class="btn" @click="addArea(true)">创建分组</div>
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
import bus from "@/utils/eventBus.js";
let store = useCounterStore();
let List = ref([]);
let ChickFlag = ref("");

let addAreaFlag = ref(false);
let newDocName = ref("");

let delAreaFlag = ref(false);
let delDocName = ref("");

function addArea(val) {
    addAreaFlag.value = val;
}

function delArea(val) {
    delAreaFlag.value = true;
    delDocName.value = val;
}

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
watch(()=>store.username,()=>{getListFunc()})

async function getListFunc(userVal = store.username) {
   try{
     ChickFlag.value = ''
    let identily = "公共空间";
    let name = userVal;
    let group = `${identily}/${name}`;
    let data = await getList(group);
    List.value = data.dirPaths;
    Jump()
   }catch(e){
    console.log(e)
   }
}

function Jump(val = null) {
    ChickFlag.value = val;
    bus.emit("ListName", val);
}

onMounted(() => {
    getListFunc();
});
// 成功弹窗
const openSuccess = (value) => {
    ElMessage({
        message: value,
        type: "success",
    });
};
</script>

<style lang="scss" scoped>
.UserList {
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;
    span {
        margin-top: 5px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: var(--color);
    }
    .btn {
        margin: 5px 0;
        height: 30px;
        line-height: 30px;
    }
    .List {
        flex: 1;
        overflow: hidden;
        height: 100%;
        overflow: auto;
        .item {
            display: flex;
            padding: 0 10px;
            justify-content: space-between;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .delbtn {
                background-color: rgba(255, 255, 255, 0.5);
                border: 0;
                margin: 0;
                padding: 0 5px;
            }
            .delbtn:hover {
                background-color: rgb(255, 120, 120);
                color: white;
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
    button {
        width: 100%;
        margin: 20px 0;
        border-radius: 5px;
    }
    input {
        height: 60px;
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
        border: red;
        background-color: var(--background);
        padding: 25px;
        border-radius: 5px;
        box-shadow: 0 0 5px 1px red;
        button {
            margin: 10px;
            background-color: #fff;
            padding: 2px 5px;
            color: var(--black);
            border: 1px solid var(--black);
        }
        .del{
            border: 1px solid red;
            color: red;
        }
    }
}
</style>