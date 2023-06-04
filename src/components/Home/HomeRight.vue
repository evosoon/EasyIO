<template>
    <div class="Right flex">
        <div class="header"></div>
        <transition name="transition">
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
    position: relative;
    flex: 1;
    flex-direction: column;
    .header {
        height: 50px;
        min-height: 50px;
        border-bottom: 1px solid var(--gray);
        background-color: var(--background);
        opacity: 0.5;
    }
}


</style>