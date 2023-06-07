<template>
    <div class="About">
        <button class="btn" @click="back">返回</button>
        <div class="center flex">
            <div>关于我们</div>
            <p>我们致力于为用户提供简洁的图片、视频及文件的云端存储服务</p>
            <p>禁止使用本站存储违法内容</p>
            <p>
                本站不对用户行为所造成的任何直接或间接的损失或损害承担任何责任
            </p>
            <p>
                网本站不对因不可抗力等无法避免和克服的原因导致的任何损失或损害承担责任
            </p>
            <p>本站保留随时修改、暂停或终止服务的权利</p>
            <p>本站仅供技术交流，禁止使用本站进行商业行为</p>
            <p>
                您存储的内容对于开发人员是透明可见的，但我们不会随意查看，篡改您的内容
            </p>
            <br />
            <div>联系我们</div>
            <p>在使用中发现异常？有更好的建议？请与我们联系</p>
            <p>技术合作请联系邮箱 : 1473352497@qq.com</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
let router = useRouter();
function back() {
    router.back();
}
</script>

<style lang="scss" scoped>
.About {
    margin: 20px;
    flex: 1;
    flex-direction: row;
    // overflow: hidden;

    .btn {
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
    }
    .center {
        flex-direction: column;
        align-items: center;
        background: linear-gradient(
                rgba(255, 255, 255, 0.9),
                rgba(255, 255, 255, 0.9)
            ),
            url("@/assets/imgs/logo_blue.png") no-repeat 50% 50%/ 40% 40%;
        height: calc(100% - 50px);
        padding: 40px;
        font-size: 20px;
        justify-content: start;
        padding: 20px 20%;
        text-align: center;

        div {
            height: 40px;
            text-align: center;
            margin: 10px;
            width: 40%;
            font-size: 20px;
            color: var(--color);
            border-bottom: 1px solid var(--color);
        }
        p {
            margin: 5px;
            min-height: 40px;
            transition: all 1s;
        }
        p:hover {
            color: var(--color);
        }
    }
}
@media screen and (max-width: 950px) {
    .About {
        .center {
            background: linear-gradient(
                    rgba(255, 255, 255, 0.9),
                    rgba(255, 255, 255, 0.9)
                ),
                url("@/assets/imgs/logo_blue.png") no-repeat 50% 50%/ 40% 20%;
            padding: 20px 10%;
        }
    }
}
</style>