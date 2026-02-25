<script setup lang="js">
import { ref } from 'vue';

const initialized=ref(false);
const stationsAndRoutes=ref(undefined);
async function init(){
  
  stationsAndRoutes.value = await fetch("https://mtr.ritzenbergen.de/mtr/api/map/stations-and-routes?dimension=0").then(res=>res.json());

}

init().then(()=>{
  initialized.value=true;
});
</script>
<template>
    <div v-if="!initialized">Initializing...</div>
    <div v-else>
        <RouterLink v-for="station in stationsAndRoutes.data.stations" :to="'/station/' + station.id">{{ station.name }}<br></RouterLink>
    </div>
</template>
<style scoped>

</style>