<template>
    <div class="Home">
            <div class="title">{{sayTime}} {{store.username}}</div>
            <div class="btn" @click="jump('/main/center')">进入空间</div>
            <div class="btn" @click="jump('/main/about')">关于</div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useCounterStore} from '@/stores/user'
import useGetTime from '@/hooks/useGetTime'
const store = useCounterStore()
let router = useRouter()
let sayTime = ref('')

function jump(val){
    router.push(val)
}
onMounted(()=>{
    sayTime.value = useGetTime()
})
</script>

<style lang="scss" scoped>
    .Home{
        flex: 1;
        margin: 20px;
        background-color: #fff;
        .title{
            padding: 10px 0 ;
            font-size: 16px;
            color: var(--color);
        }
        div{
            padding: 50px;
            margin: 20px;
        }
    }
</style>