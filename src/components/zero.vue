<template>
  <div class="box flex">{{show}}</div>
</template>

<script setup>
import {ref,reactive,computed} from 'vue'
const data = reactive({
  li:['「远望高楼近书山，春去冬来又一环」',
      '「WORLD BEYOND」',
      '「我不知写什么了」',
      '「轻轻的我走了，正如我轻轻的来」',
      '「广告位招租」',
      ]
})
let show = computed(()=> data.li[Math.floor(Math.random()*10%5)])
</script>

<style lang="scss" scoped>
    .box{
        justify-content: center;
        align-items: center;
        width: 100%;
    }
</style>