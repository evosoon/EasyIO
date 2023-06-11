<template>
    <div class="item">
        <a class="picture" :href="props.item.path" target="_block">
            <img v-lazy="props.item.path" alt="" />
        </a>
        <div class="word flex">
            <a
                class="btn copylink"
                @click.stop="useCopylink(props.item.path)"
                v-text="props.item.name"
            ></a>
            <a
                class="btn del"
                v-if="delFlag"
                @click.stop="deleteItem(props.item.path)"
                >确定</a
            >
            <a v-if="!delFlag" class="btn del" @click.stop="delFlag = !delFlag"
                >删除</a
            >
            <a v-if="delFlag" class="btn del" @click.stop="delFlag = !delFlag"
                >取消</a
            >
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import useCopylink from "@/hooks/useCopylink";
import { openSuccess, openError } from "@/hooks/usePOP";
import { delPicItem } from "@/apis/pictureApi";
import bus from "@/utils/eventBus";

let props = defineProps(["item"]);
let delFlag = ref(false);
async function deleteItem(path) {
    let pathD = path.slice(34);
    console.log(pathD);
    try {
        let data = await delPicItem(pathD);
        openSuccess(data.message);
        bus.emit("updataList");
    } catch (e) {
        openError(e);
    }
}
</script>

<style lang='scss' scoped>
.item {
    padding: 5px;
    margin: 5px 2px;
    overflow: hidden;
    border-radius: 5px;
    background-color: #fff;
    transition: all 0.8s;
    .word {
        justify-content: space-between;
        display: flex;
        width: 100%;
        .copylink {
            flex: 4;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .del {
            flex: 1;
        }
        .copylink:hover {
            color: white;
            padding: 0 5px;
            background-image: linear-gradient(
                45deg,
                rgb(201, 217, 255),
                rgb(171, 183, 208)
            );
        }
        .copylink:hover::after {
            content: "复制链接";
            padding: 0 5px;
            color: white;
        }
        .del:hover {
            padding: 0 5px;

            color: white;
            background-image: linear-gradient(
                45deg,
                rgb(255, 116, 116),
                rgb(255, 108, 108)
            );
        }
        .btn {
            color: var(--black);
            border: 0;
        }
    }
    .picture {
        overflow: hidden;
        transition: all 0.8s;
        img {
            width: 100%;
            aspect-ratio: 4/3;

            object-fit: cover;
        }
    }
    .picture:hover {
        opacity: 0.8;
    }
}
.item:hover {
    box-shadow: 0 2px 8px 0 var(--color), 0 4px 20px 0 var(--bgColor);
}
@media screen and (max-width: 950px) {
    .item {
        padding: 5px;
        margin: 5px 2px;
        overflow: hidden;
        border-radius: 5px;
        background-color: #fff;
        transition: all 0.8s;
        .word {
            flex-direction: column;
        }
        .picture {
            overflow: hidden;
            transition: all 0.8s;
            img {
                width: 100%;
                aspect-ratio: 4/3;

                object-fit: cover;
            }
        }
    }
}
</style>