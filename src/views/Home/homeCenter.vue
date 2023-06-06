<template>
    <div class="Center flex">
        <div class="left">
            <UserList></UserList>
        </div>
        <div class="Zero"></div>
        <DocList></DocList>
    </div>
</template>

<script setup>
import UserList from "@/components/Home/UserList.vue";
import DocList from "@/components/Home/DocList.vue";
</script>

<style lang="scss" scoped>
.Center {
    height: 100%;
    margin: 20px;
    overflow: hidden;
    .left {
        flex: 1;
    }
    .Zero {
        border-left: 1px solid var(--color);
        margin-left: 1px;
        opacity: 0.8;
    }
}
</style>