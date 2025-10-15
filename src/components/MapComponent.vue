<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import { onBeforeUnmount, onMounted, ref } from 'vue';

mapboxgl.accessToken = import.meta.env.ACCESS_TOKEN;
const mapContainer = ref(null);
let map = null;

const props = defineProps({
    center: { type: Array, default: () => [103.8198, 1.3521] }, // [long, lat] in this case, Singapore
    zoom: { type: Number, default: 10 },
    markers: { type: Array, default: () => {} },
});

onMounted(() => {
    map = new Map({
        container: this.$ref.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.center,
        zoom: this.zoom,
    });

    if (this.props.markers) {
        this.props.markers.forEach((loc) => {
            new mapboxgl.Marker().setLngLat(loc.coords).addTo(map);
        });
    }
});

onBeforeUnmount(() => {
    if (this.map) {
        this.map.remove();
    }
});
</script>

<style scoped>
.map-container {
    width: 60%;
    height: auto;
}
</style>
