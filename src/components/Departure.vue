<script setup lang="js">
import { ref, defineProps } from 'vue';
import Laufschrift from './Laufschrift.vue';
const props=defineProps({
    arrival: Object,
    currentTime: Number,
    type: String
});

function textColor() {
    const r = (props.arrival.routeColor >> 16) & 0xff
    const g = (props.arrival.routeColor >> 8) & 0xff
    const b = props.arrival.routeColor & 0xff
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? "#000000" : "#ffffff"
}

function formatDepartureSmart(arrival, currentTime) {
    let diff=arrival-currentTime;

    if (diff <= 0) return "jetzt";


    const seconds = Math.floor(diff / 1000);
    if(seconds<60)
        return `${seconds} s`;

    const minutes = Math.floor(diff / 60000);

    if (minutes < 60)
        return `${minutes} min`;

    const date = new Date(arrival);

    return date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
const platformmapping={
    "ICE": "Gl",
    "RB": "Gl",
    "RE": "Gl",
    "U": "Gl",
    "S": "Gl",
    "Tram": "Hst",
    "Bus": "Hst",
    "Fähre": "Anl"
}
</script>
<template>
    <div class="departurewrapper">
        <span class="linie" :style="{'background-color':'#'+props.arrival.routeColor.toString(16).padStart(6,'0'), 'color': textColor() }">{{ props.arrival.routeNumber }}</span> <Laufschrift>{{ props.arrival.destination }}</Laufschrift> <span class="platformnumber">{{ platformmapping[props.type] }}. {{ props.arrival.platformName }}</span><span class="date">{{ formatDepartureSmart(props.arrival.arrival, props.currentTime) }}</span>
    </div>
</template>
<style scoped>
.linie {
    padding: 2px;
    border-radius: 5px;
    min-width: 100px;
    text-align: center;
    margin-right: 10px;
}

.departurewrapper{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    white-space: nowrap;
    font-size: 20px;
}
.date {
    margin-left: 10px;
    min-width: 70px;
    text-align: center;
}
.platformnumber {
    margin-left: auto;
    min-width: 70px;
    text-align: center;
}
</style>
