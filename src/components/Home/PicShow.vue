<template>
    <div class="PicShow" v-if="props.checkItem">
        <div class="picture">
            <img :src="props.checkItem.path" alt="" />
        </div>
        <span>图片信息</span>
        <div class="name" v-text="props.checkItem.name"></div>
        <div
            class="path"
            v-text="props.checkItem.path"
            @click="useCopylink(props.checkItem.path)"
        ></div>
        <a class="btn" :href="props.checkItem.path" target="_blank"
            >点击查看图片</a
        >
    </div>
</template>

<script setup>
import bus from "@/utils/eventBus";
let props = defineProps(["checkItem"]);
import useCopylink from "@/hooks/useCopylink";
</script>

<style lang="scss" scoped>
.PicShow {
    flex: 1;
    background-color: #fff;
    border-left: 5px solid var(--gray);
    margin-left: 4px;
    overflow: auto;
    padding: 10px;
    .picture {
        width: 100%;
        min-height: 30%;
        // max-height: 500px;
        // border: 1px solid var(--color);
        box-shadow: 0 4px 8px 0 rgba(49, 49, 49, 0.2),
            0 6px 20px 0 rgba(67, 67, 67, 0.19);
        padding: 5px;
        overflow: auto;
        border-radius: 5px;
        transition: all 1s;
        img {
            width: 100%;
            border-radius: 5px;
            object-fit: cover;
        }
    }
    .picture:hover {
        box-shadow: 0 4px 8px 0 var(--bgColor), 0 6px 20px 0 var(--bgColor);
    }
    span {
        display: block;
        height: 50px;
        margin: 5px;
        line-height: 50px;
        font-size: 16px;
        color: var(--color);
        border-bottom: 1px solid var(--color);
    }
    .name,
    .path {
        margin: 20px 5px;
        word-wrap: break-word;
    }
    .name:before {
        content: "图片名称 : ";
    }
    .path:before {
        content: "图片路径 : ";
        color: var(--black);
    }
    .path:hover {
        color: var(--color);
    }
    .path:hover::after {
        content: "点击复制链接";
        color: var(--background);
        background-color: var(--color);
        margin-left: 5px;
        padding: 0 5px;
    }
    .btn {
        text-align: left;
        border: 0;
        margin: 5px;
        padding: 5px;
    }
    .btn:hover {
        background: 0;
        border: 1px solid var(--bgColor);
    }
}
</style>