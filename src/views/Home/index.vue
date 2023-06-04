<template>
    <div class="flex box">
        <HomeLeft></HomeLeft>
        <HomeRight></HomeRight>
    </div>
</template>

<script setup>
import HomeLeft from "@/components/Home/HomeLeft.vue";
import HomeRight from "@/components/Home/HomeRight.vue";
import moduleName from 'module'
import { onMounted } from 'vue'
import {useCounterStore } from '@/stores/user'
import {useRouter} from 'vue-router'
import { getUser } from "@/apis/userApi";

const router = useRouter()
async function getUserInfo(){
    const store = useCounterStore()
    try{
    const data = await getUser()
    store.setUsername(data.username)
    }catch(e){
        if(localStorage.getItem('token')){
            localStorage.removeItem('token')
            router.push('/login')
            }
    }
}
onMounted(()=>{
    getUserInfo()
})
</script>

<style lang="scss" scoped>
    .box{
        flex-direction: row;
        height: 100vh;
    }
</style>