<script setup lang="ts">
import { ref } from 'vue'
const translate = ref(0)
const content = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()
setInterval(() => {
  translate.value=translate.value == 0
    ? ((-1 * content.value?.clientWidth!)+wrapper.value?.clientWidth!)
    : (0)
}, 5000)
</script>
<template>
  <div class="laufschrift-wrapper" ref="wrapper">
    <span class="laufschrift-content" ref="content" :style="{ transform: `translateX(${translate}px)` }">
      <slot></slot>
    </span>
  </div>
</template>
<style scoped>
.laufschrift-wrapper {
  display: inline-flex;

  overflow: hidden;
}
.laufschrift-content {
  transition: all ease-in-out 3s;
  white-space: nowrap;
}
</style>