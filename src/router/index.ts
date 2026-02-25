import { createRouter, createWebHashHistory } from 'vue-router'
import StationOverview from '../views/StationOverview.vue'
import StationDisplay from '../views/StationDisplay.vue'


const routes:any[] = [
   { path: '/', component: StationOverview },
   { path: '/station/:stationId', component: StationDisplay },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})