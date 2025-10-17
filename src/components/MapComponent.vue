<template>
    <div ref="mapContainer" class="map-container" style="width: 24rem; height: 24rem"></div>
    <nav>
        <h3>For routing, please click your origin and destination on the map.</h3>
        <img :src="{ RouteIcon }" @click="gpsDirection" alt="routing" />
    </nav>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import RouteIcon from '../../public/Route.png';
import '@maplibre/maplibre-gl-directions/dist/maplibre-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from 'axios';
import { onBeforeUnmount, onMounted, ref } from 'vue';

mapboxgl.accessToken = process.env.VITE_MAPBOX_ACCESS_TOKEN;
const mapContainer = ref(null);
let map;
const tempMarkers = []; //Collect origin and destination

const props = defineProps({
    center: { type: Array, default: () => [103.8198, 1.3521] }, // [long, lat] in this case, Singapore
    zoom: { type: Number, default: 10 },
    layers: { type: Array, default: null },
});

const gpsDirection = async (map) => {
    // 1. Cleanup before starting a new route
    tempMarkers.forEach((m) => m.remove());
    tempMarkers.length = 0;
    if (map.getLayer('route-line')) {
        map.removeLayer('route-line');
        map.removeSource('route');
    }

    console.log('Routing initiated. Please click on the map to set the ORIGIN point.');

    // 2. AWAIT FIRST CLICK (Origin)
    const origin = await waitForCoordinateClick(map, layerIds);
    // Add visual marker for Origin
    const originMarker = new mapboxgl.Marker({ color: '#007cbf' }).setLngLat(origin).addTo(map);
    temporaryMarkers.push(originMarker);

    console.log('Please click on the map to set the DESTINATION point.');

    // 3. AWAIT SECOND CLICK (Destination)
    const destination = await waitForCoordinateClick(map, layerIds);
    console.log(`Destination set at: ${destination.lng}, ${destination.lat}`);

    // Add visual marker for Destination
    const destMarker = new mapboxgl.Marker({ color: '#ff0000' }).setLngLat(destination).addTo(map);
    temporaryMarkers.push(destMarker);

    // 4. REQUEST AND DRAW ROUTE
    const routeGeometry = await getRoute(origin, destination);

    if (routeGeometry) {
        drawRoute(routeGeometry);
        console.log('Route successfully calculated and drawn.');
    } else {
        console.error('Could not find a valid route.');
    }
};

const getRoute = async (origin, destination) => {
    const profile = 'walking';
    const coordinates = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const response = await axios(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry; // Returns the GeoJSON LineString geometry
    }
    return null;
};

const drawRoute = (routeGeoJSON) => {
    if (!routeGeoJSON) return;
    const routeSourceId = 'route';

    if (map.getSource(routeSourceId)) {
        map.getSource(routeSourceId).setData({
            type: 'Feature',
            geometry: routeGeoJSON,
        });
    } else {
        map.addSource(routeSourceId, {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: routeGeoJSON,
            },
        });
        map.addLayer({
            id: 'route-line',
            type: 'line',
            source: routeSourceId,
            paint: { 'line-color': '#FF00ff', 'line-width': 6, 'line-opacity': 0.75 },
        });
    }
};

const waitForCoordinateClick = (map, geojsonLayerIds) => {
    return new Promise((resolve) => {
        // Define the click handler function
        const clickHandler = (e) => {
            // 1. Query features across the defined GeoJSON layers
            const features = map.queryRenderedFeatures(e.point, {
                layers: geojsonLayerIds,
            });

            let clickedLngLat;

            if (features.length > 0) {
                // Clicked on a GeoJSON feature
                const coords = features[0].geometry.coordinates;
                clickedLngLat = { lng: coords[0], lat: coords[1] };
            } else {
                // Clicked on the map background
                clickedLngLat = e.lngLat;
            }

            // 2. IMPORTANT: Remove the handler to stop listening after the first click
            map.off('click', clickHandler);

            // 3. Resolve the promise with the final coordinate
            resolve(clickedLngLat);
        };
        // Attach the temporary click handler
        map.on('click', clickHandler);
    });
};

const geoPath = '../src/assets/geojson';

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
