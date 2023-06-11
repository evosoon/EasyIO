<template>
    <div class="item flex">
        <button class="btn" @mouseover="$emit('getItem', item)">快速查看</button>
        <a
            @click.stop="$emit('getItem', item)"
            :class="{ chickClass: item.name == props.ChickFlag }"
            >{{ props.item.name }}</a
        >
        <button class="btn" v-if="flag" @click="flag = !flag">删除</button>
        <template v-else>
            <button class="btn" @click="deleteItem(props.item.path)">确定</button>
            <button class="btn" @click="flag = !flag">取消</button>
        </template>
    </div>
</template>

<script setup>
import { ref,defineEmits } from "vue";
import { delPicItem } from "@/apis/pictureApi";
import {openSuccess , openError} from '@/hooks/usePOP'

const props = defineProps(["item","ChickFlag"]);
const emit = defineEmits(['getPicListFun'])
// 删除标识
let flag = ref(true);

async function deleteItem(path) {
    
    let pathD = path.slice(34);
    try {
        let data = await delPicItem(pathD);
        openSuccess(data.message)
        emit('getPicListFun')
    } catch (e) {
        openError(e)
    }
}

</script>
  
<style lang="scss" scoped>
.item {
    height: 40px;
    margin: 0 10px 5px 0;
    align-items: center;
    border-bottom: 1px solid rgb(203, 203, 203);
    overflow: hidden;
    .chickClass {
        color: var(--color);
    }
    a {
        flex: 8;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    a:hover {
        color: var(--color);
    }
    .btn {
        border: 1px solid transparent;
        height: 20px;
        text-align: center;
        padding: 0 10px;
        min-width: 50px;
        margin: 0 5px;
    }
    .btn:hover{
        border: 1px solid var(--color);

    }
}
@media screen and (max-width:960px) {
    .item{
        .btn{
            margin: 0;
            padding: 0;
            text-align: right;
        }
    }
}
</style>