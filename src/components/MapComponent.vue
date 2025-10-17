<template>
    <div ref="mapContainer" class="map-container" style="width: 24rem; height: 24rem"></div>
    <div class="mt-2 align-center">
        <h3>Use routing service</h3>
        <input type="text" placeholder="origin" v-model="origin" />
        <input type="text" placeholder="destination" v-model="destination" />
    </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';

import '@maplibre/maplibre-gl-directions/dist/maplibre-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { onBeforeUnmount, onMounted, ref } from 'vue';

mapboxgl.accessToken = process.env.VITE_MAPBOX_ACCESS_TOKEN;
const mapContainer = ref(null);
let map;

const props = defineProps({
    center: { type: Array, default: () => [103.8198, 1.3521] }, // [long, lat] in this case, Singapore
    zoom: { type: Number, default: 10 },
    layers: { type: Array, default: null },
});

const geoPath = '../src/assets/geojson';

let originPoint = null;
let destinationPoint = null;
const routingPoints = []; // Stores the Marker objects for the UI
const maxWaypoints = 2; // Origin and Destination

onMounted(() => {
    map = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'https://demotiles.maplibre.org/style.json',
        center: props.center,
        zoom: props.zoom,
    });

    map.on('load', () => {
        if (props.layers) {
            props.layers.forEach((layer) => {
                map.addSource(layer, { type: 'geojson', data: `${geoPath}/${layer}.geojson` });
                map.addLayer({
                    id: layer,
                    type: 'circle',
                    source: layer,
                    paint: {
                        'circle-radius': 7,
                        'circle-color': [
                            'match',
                            ['get', 'category'],
                            'community',
                            '#008080',
                            '#000000',
                        ],
                    },
                });
            });
        }
        map.addControl(new mapboxgl.NavigationControl()); // Navigation

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
            })
        ); // User Location
        map.addControl(new mapboxgl.ScaleControl()); // Scale on the map

        map.on('click', async (e) => {
            // 1. Query features across ALL defined GeoJSON layers
            const features = map.queryRenderedFeatures(e.point, {
                layers: props.layers,
            });

            let clickedLngLat;
            let pointName = 'Map Click'; // Default name

            if (features.length > 0) {
                // User clicked on one of the GeoJSON markers
                const clickedFeature = features[0];
                const coords = clickedFeature.geometry.coordinates;

                // Use the feature's coordinates
                clickedLngLat = { lng: coords[0], lat: coords[1] };

                // Try to get a meaningful name for logging (assuming a 'name' property exists)
                pointName = clickedFeature.properties.name || 'GeoJSON Point';

                console.log(
                    `Clicked GeoJSON feature: ${pointName} from layer: ${clickedFeature.layer.id}`
                );
            }
        });
    });
});

onBeforeUnmount(() => {
    if (this.map) {
        this.map.remove();
    }
});
</script>

<style scoped>
.mapboxgl-crtl-logo {
    display: block !important;
}
</style>
