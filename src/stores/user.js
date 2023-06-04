import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('userinfo', () => {
  let username = ref('')
  function setUsername(value){
    username.value = value
  }
  return { username, setUsername }
})
