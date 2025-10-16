<template>
    <div ref="mapContainer" class="map-container" style="width: 24rem; height: 24rem"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/src/directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { accessToken } from 'mapbox-gl';

mapboxgl.accessToken = process.env.VITE_MAPBOX_ACCESS_TOKEN;
const mapContainer = ref(null);
let map;

const props = defineProps({
    center: { type: Array, default: () => [103.8198, 1.3521] }, // [long, lat] in this case, Singapore
    zoom: { type: Number, default: 10 },
    layers: { type: Array, default: null },
});

const geoPath = '../src/assets/geojson';

onMounted(() => {
    map = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: props.center,
        zoom: props.zoom,
        attributionControl: true,
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
            new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving',
            })
        );
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
            })
        ); // User Location
        map.addControl(new mapboxgl.ScaleControl()); // Scale on the map

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
            })
        );
    });

    map.on('click', 'places-layer', (e) => {
        const feature = e.features[0];
        new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                `<strong>${feature.properties.name}</strong> - <strong>${feature.properties.address}</strong>`
            )
            .addTo(map);
    });

    map.on('mouseenter', 'places-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places-layer', (e) => {
        map.getCanvas().style.cursor = '';
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
