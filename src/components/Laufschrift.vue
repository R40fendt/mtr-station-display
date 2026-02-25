<script setup lang="js">
import { ref } from 'vue';
const props=defineProps({
    text: String
});
const current=ref(0);
function cycle(){
    current.value=(current.value+1)%props.text.split("|").length;
    setTimeout(cycle, 2000);
}
setTimeout(cycle, 2000);
</script>
<template>
    <span v-for="t,i in props.text.split('|')" v-show="current==i">{{ t }}</span>

</template>
<style scoped>
</style>