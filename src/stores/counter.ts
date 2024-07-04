import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const role = ref<String>();
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function setRole(newRole:String) {
    role.value = newRole;
  }
  function removeRole() {
    role.value = "";
  }

  return { count, doubleCount, increment, role, setRole,removeRole }
})
