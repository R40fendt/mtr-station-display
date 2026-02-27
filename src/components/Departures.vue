<script setup lang="js">
import { ref, defineProps } from 'vue';
import Departure from './Departure.vue';

const arrivals=ref(undefined);
const props=defineProps({
    routes: Array,
    stationId: String,
    type: String
});



async function getArrivals(stationId){
    return await fetch("https://mtr.ritzenbergen.de/mtr/api/map/arrivals?dimension=0", {
        body: JSON.stringify({
            stationIdsHex: [stationId], maxCountPerPlatform: 5
        }),
        method: "POST"
    })
    .then(res=>res.json())
}

async function loadData(){

    arrivals.value=await getArrivals(props.stationId);
    
    setTimeout(loadData, 2000);
}
const initialized=ref(false);

loadData().then(()=>{
    initialized.value=true;
});
const typeMapping={
    "Zug": "Zug",
    "U": "U-Bahn",
    "S": "S-Bahn",
    "Tram": "Straßenbahn",
    "Bus": "Bus",
    "Fähre": "Fähre"
}

function getImage(type){
    return new URL("../assets/" + type + ".png", import.meta.url).href;
}
</script>
<template>
    <div v-if="!initialized">Initializing...</div>
    <div v-else-if="props.routes.length>0" class="wrapper">
        <div class="header">
            <img :src="getImage(props.type)"/>
            <span class="headline">{{ typeMapping[props.type] }}</span>
        </div>
        <div class="arrivals" v-for="arrival, i in arrivals.data.arrivals" :key="i" >
            <div class="arrival" v-if="arrival.routeName.startsWith(props.type)">
                <Departure :type="props.type" :arrival="arrival" :currentTime="arrivals.currentTime"></Departure>
                <br>
            </div>
        </div>
        <br>
    </div>
</template>
<style scoped>
.header {
    position: relative;
    margin-bottom: 10px;
}

.headline {
    font-size: 50px;
    position: absolute;
    top: 0;
    left: 75px;
}
.wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 12px;
}

img {
    width: 64px;
    height: 64px;
}
</style>