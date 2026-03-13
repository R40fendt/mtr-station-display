<script setup lang="js">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Departure from '../components/Departure.vue';
import Departures from '../components/Departures.vue';

const initialized=ref(false);
const stationData=ref(undefined);
const stationsAndRoutes=ref(undefined);
const routeData=ref(undefined);
const route=useRoute();

async function init(){

    routeData.value = await fetch("https://mtr.ritzenbergen.de/mtr/api/map/stations-and-routes?dimension=0")
    .then(res=>res.json());
    stationData.value=routeData.value.data.stations.filter((s)=>s.id==route.params.stationId)[0]
    routeData.value=routeData.value.data.routes
    .filter((r)=>r.stations.map((s)=>s.id).includes(route.params.stationId));
  
}

init().then(()=>{
    initialized.value=true;
});

const routeTypes=ref(["ICE","RB","RE","U","S","Tram","Bus","Fähre"]);
</script>
<template>
    <div v-if="!initialized">
        Initializing...
    </div>
    <div v-else>
    <h1>Abfahrten {{ stationData.name }}</h1>
    <div class="container"><Departures class="departures" :type="type" v-for="type in routeTypes" :routes="routeData.filter((s)=>s.name.startsWith(type))" :stationId="stationData.id"/></div>
        <div>
            <h2>Fahrplanauskunft und Liniennetz unter mtr.ritzenbergen.de</h2>
        </div>
    </div>
</template>
<style scoped>
.departures {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    min-width: 300px;
    width: 100%;
    max-width: 600px;
    height: 300px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 20px;
    background-color: #eeeeee;
}
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

</style>
