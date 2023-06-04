<template>
  <div class="UserCenter">
    <button class="btn" @click="getListFunc()">刷新</button>
    <div class="title">用户信息 </div>
   
    <div class="info">用户名：{{store.username}}</div>
    <div class="title">文件信息 </div>
    <div class="info">文件夹数:{{List.length}}</div>
    <div class="info">总图片数:{{picture}}</div>
  </div>
</template>

<script setup>
import {onMounted,ref,watch} from 'vue'
import { useCounterStore} from "@/stores/user";
import {getList,getPicList} from '@/apis/pictureApi'

const store = useCounterStore()

let List = ref([])
let picture = ref(0)


async function getListFunc(userVal = store.username) {
    let identily = "公共空间";
    let name = await userVal;
    let group = `${identily}/${name}`;
    let data = await getList(group);
    List.value = data.dirPaths

    picture.value = 0

   for(let i = 0; i<data.dirPaths.length;i++){
     let group = `${identily}/${name}/${List.value[i].name}`;
    let data2 = await getPicList(group)
    picture.value = picture.value + data2.filePaths.length
   }
}


onMounted(()=>{
  getListFunc()
})

</script>

<style lang="scss" scoped>
    .UserCenter{
        flex: 1;
        background-color: var(--background);
        margin: 20px;
        padding: 15px;
        overflow: auto;
         .btn{
            margin: 10px 0;
            width: 100%;
            padding: 10px 30px;
          }
        .title{
          font-size: 20px;
          color: var(--color);
          padding: 10px;
          border-bottom: 1px solid var(--bgColor);
         
        }
        .info{
          font-size: 20px;
          margin: 20px;
          padding: 20px 0;
        }

    }
</style>