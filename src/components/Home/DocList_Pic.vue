<template>
    <div class="DocList flex">
        <template v-if="props.FilPicList.length">
            <div class="center flex">
                <div  class="li" v-for="List in Lists">
                      <ShowItem  v-for="item in List" :item='item' :key="item.name"></ShowItem>
                </div>
            </div>
        </template>
        <Zero v-else></Zero>
    </div>
</template>

<script setup>
import Zero from "@/components/zero.vue";
import ShowItem from '@/components/ShowItem.vue'
import { watchEffect, ref, reactive, onMounted } from "vue";

//
let delFlag = ref(false);
//

const data = reactive({
    list: [[], [], [], []],
});

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
            max-width: 25%;
        }
    }
}
@media screen and (max-width: 950px) {
    .DocList {
        background-color: #fff;
        flex: 1;
        flex-wrap: wrap;
        overflow: hidden;
        padding: 5px;
        .center {
            height: 100%;
            background-color: var(--gray);
            overflow: auto;
            flex-direction: row;
            margin-bottom: 70px;
            .li {
                margin: 1px;
                width: calc(25% - 2px);
              
            }
        }
    }
}
</style>