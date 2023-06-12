<template>
    <div class="Left flex">
        <div class="main flex">
            <span class="user" @click="jump('/main/user')"
                ><img src="@/assets/icon/customer-center.png"
            /></span>
            <span class="home" @click="jump('/main/')"
                ><img src="@/assets/icon/home.png"
            /></span>
            <span class="home" @click="jump('/main/about')"
                ><img src="@/assets/icon/about.png"
            /></span>
            <span class="home" @click="jump('/main/setting')"
                ><img src="@/assets/icon/settings.png"
            /></span>
            <span class="exit" @click="out = true"
                ><img src="@/assets/icon/exit.png"
            /></span>
        </div>
        <div class="logo"><img src="@/assets/imgs/logo_white.png" /></div>
    </div>

    <teleport to="body" v-if="out">
        <div class="POP flex">
            <div>
                是否退出？
                <button class="btn del" @click="[jump('/login'), outLogin()]">
                    退出
                </button>
                <button class="btn close" @click="out = false">取消</button>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();

let out = ref(false);
// 路由跳转
function jump(val) {
    router.push(val);
    // 退出登录
}
function outLogin() {
    localStorage.removeItem("token");
}
</script>

<style lang="scss" scoped>
.Left {
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 60px;
    min-width: 60px;
    background-color: var(--barColor);
    box-shadow: -1px 0 5px 1px var(--black);
    div {
        img {
            width: 60px;
        }
    }
    .main {
        flex-direction: column;
        span {
            cursor: pointer;
            margin: 5px;
            padding: 10px;
            border-radius: 10px;
            position: relative;
        }
        span:hover {
            box-shadow: 0 0 2px 1px var(--background);
        }
        img {
            width: 30px;
        }
    }
    img {
        width: 30px;
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
        border: var(--bgColor);
        background-color: rgba($color: #e7eaff, $alpha: 0.4);
        padding: 50px 75px;
        border-radius: 5px;
        box-shadow: 0 0 5px 1px var(--bgColor);
        transition: all 1s;
        button {
            margin: 10px;
            background-color: #fff;
            padding: 2px 5px;
            color: var(--black);
            border: 1px solid var(--gray);
        }
        .del {
            border: 1px solid var(--bgColor);
            color: var(--color);
        }
        .del:hover {
            background-image: linear-gradient(0deg, #8fa5ff, #9fc9ff);
        }
        .close:hover {
            background-image: linear-gradient(0deg, #cdcdcd, #cacaca);
        }
    }
    div:hover {
        padding: 55px 85px;
        font-size: 20px;
        button {
            padding: 5px 10px;
        }
    }
}

@media screen and (max-width: 600px) {
    .Left {
        position: fixed;
        z-index: 10;
        flex-direction: row;
        justify-content: space-between;
        height: 60px;
        width: 100%;
        background-color: var(--barColor);
        box-shadow: -1px 0 5px 1px var(--black);
        div {
            img {
                width: 60px;
            }
        }
        .logo{
            margin-right: 5px;
        }
        .main {
            flex-direction: row;
            span {
                cursor: pointer;
                margin: 5px;
                padding: 10px;
                border-radius: 10px;
                position: relative;
            }
            span:hover {
                box-shadow: 0 0 2px 1px var(--background);
            }
            img {
                width: 30px;
            }
        }
        img {
            width: 30px;
        }
    }
}
</style>