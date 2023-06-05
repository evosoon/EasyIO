<template>
  <div class="Left flex">
    <span class="user" @click="jump('/main/user')"><img src="@/assets/icon/customer-center.png"/></span>
    <span class="home" @click="jump('/main/')"><img src="@/assets/icon/home.png"/></span>
    <span class="home" @click="jump('/main/about')"><img src="@/assets/icon/about.png"/></span>
    <span class="home" @click="jump('/main/setting')"><img src="@/assets/icon/settings.png"/></span>
    <span class="exit" @click="[jump('/login'),outLogin()]"><img src="@/assets/icon/exit.png"/></span>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
let router = useRouter()
function jump(val){
  router.push(val)
}
function outLogin(){
  localStorage.removeItem("token");
}
</script>

<style lang="scss" scoped>
    .Left{
        flex-direction: column;
        width: 60px;
        min-width: 60px;
        height: 100%;
        background-color: var(--bgColor);
        box-shadow: -1px 0 5px 1px var(--black);
        span{
          margin: 5px;
          padding: 10px;
          border-radius: 10px;
          position: relative;
        }
        span:hover{
          box-shadow: 0 0 2px 1px white;
        }
        img{
          width: 30px;
        }
    }
</style>