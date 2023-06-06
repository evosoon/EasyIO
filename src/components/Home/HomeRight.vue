<template>
    <div class="Right flex">
        <!-- 通知栏 [可以启用] -->
        <!-- <div class="header"></div> -->

        <transition name="transition">
            <!-- 二级路由 home homeCenter user about seeting(404) -->
            <router-view></router-view>
        </transition>

        <!-- <router-view v-slot="{ Component }">
            <transition name="transition">
                <component :is="Component" />
            </transition>
        </router-view> -->
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Right {
    flex-direction: column;
    position: relative;
    flex: 1;
    .header {
        height: 50px;
        min-height: 50px;
        border-bottom: 1px solid var(--gray);
        background-color: var(--background);
        opacity: 0.5;
    }
}
</style>