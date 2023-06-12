<template>
    <div class="Center flex">
        <div class="left">
            <UserList></UserList>
        </div>
        <div class="Zero"></div>
        <DocList class="DocList"></DocList>
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
@media screen and (max-width: 600px) {

    .Center {
        width: calc(100% - 10px);
        margin: 10px 5px;
        display: flex;
        flex-direction: column;
        height: 100%;
        .left {
            // height: 20%;
            height: 200px;
            max-height: 200px;
            padding-bottom: 2px;
            border-bottom: 2px solid var(--gray);
        }
        .Zero{
            display: none;
        }
        .DocList{
            height: 80%;
        }
    }
}
</style>