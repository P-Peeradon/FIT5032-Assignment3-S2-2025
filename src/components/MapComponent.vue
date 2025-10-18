<template>
    <div ref="mapContainer" class="map-container" style="width: 24rem; height: 24rem"></div>
    <nav class="d-flex flex-col">
        <div>
            <h3>For routing, please click your origin and destination on the map.</h3>
            <img
                src="../../public/Route.png"
                @click="gpsDirection(mapObj)"
                style="
                    width: 30px;
                    height: 30px;
                    :hover {
                        cursor: pointer;
                    }
                "
                alt="routing"
            />
        </div>
        <p>{{ instruction }}</p>
    </nav>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from 'axios';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
    center: { type: Array, default: () => [103.8198, 1.3521] }, // [long, lat] in this case, Singapore
    zoom: { type: Number, default: 10 },
    layers: { type: Array, default: [] },
});

mapboxgl.accessToken = process.env.VITE_MAPBOX_ACCESS_TOKEN;
const mapContainer = ref(null);
const mapObj = ref(null);
const geoLayers = ref([]);
const geoPath = computed(() => {
    if (geoLayers.value.length > 0) {
        return geoLayers.value.map((layer) => `/public/geojson/${layer}.geojson`);
    } else return [];
});
const tempMarkers = []; //Collect origin and destination
const instruction = ref('');

const gpsDirection = async (map) => {
    // 1. Cleanup before starting a new route
    tempMarkers.forEach((point) => point.remove());
    tempMarkers.length = 0;
    if (map.getLayer('route-line')) {
        map.removeLayer('route-line');
        map.removeSource('route');
    }

    instruction.value = 'Routing initiated. Please click on the map to set the ORIGIN point.';

    // 2. AWAIT FIRST CLICK (Origin)
    const origin = await waitForCoordinateClick(map, layerIds);
    // Add visual marker for Origin
    const originMarker = new mapboxgl.Marker({ color: '#007cbf' }).setLngLat(origin).addTo(map);
    temporaryMarkers.push(originMarker);

    instruction.value = 'Please click on the map to set the DESTINATION point.';

    // 3. AWAIT SECOND CLICK (Destination)
    const destination = await waitForCoordinateClick(map, layerIds);
    instruction.value = `Destination set at: ${destination.lng}, ${destination.lat}`;

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

    instruction.value = '';
};

const getRoute = async (origin, destination) => {
    const profile = 'walking';
    const coordinates = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const response = await axios.get(url);
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

const initialiseMap = () => {
    const map = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: props.center,
        zoom: props.zoom,
        interactive: true,
    });

    geoLayers.value = props.layers;

    map.on('load', () => {
        const interactiveLayersIds = [];

        if (geoLayers.value.length > 0) {
            for (const idx in geoLayers.value) {
                const layer = geoLayers.value[idx];
                const source = geoPath.value[idx];

                map.addSource(geoLayers.value[idx], { type: 'geojson', data: geoPath.value[idx] });
                map.addLayer({
                    id: layer + '- point',
                    type: 'circle',
                    source: geoPath.value[idx],
                    filter: ['==', '$type', 'Point'],
                    paint: {
                        'circle-radius': 7,
                        'circle-color': [
                            'match',
                            ['get', 'category'],
                            'community',
                            '#008080',
                            'university',
                            '#C41E3A',
                            '#000000',
                        ],
                    },
                    interactive: true,
                });
                interactiveLayerIds.push(layer + '- point');

                map.addLayer({
                    id: source + '- polygon',
                    type: 'fill',
                    source: geoPath.value[idx],
                    filter: ['==', '$type', 'Polygon'],
                    paint: {
                        'fill-opacity': 0.5,
                        'fill-color': [
                            'match',
                            ['get', 'category'],
                            'community',
                            '#008080',
                            'university',
                            '#C41E3A',
                            '#000000',
                        ],
                    },
                    interactive: true,
                });
                interactiveLayerIds.push(source + '- polygon');
            }
        }
        map.on('mousemove', (e) => {
            // Check for features in the interactive layers at the current mouse point
            const features = map.queryRenderedFeatures(e.point, {
                layers: interactiveLayerIds,
            });

            // Set the cursor based on whether features were found
            if (features.length > 0) {
                // Hand cursor (pointer)
                map.getCanvas().style.cursor = 'pointer';
            } else {
                // Default cursor (arrow)
                map.getCanvas().style.cursor = '';
            }
        });

        map.addControl(new mapboxgl.NavigationControl()); // Navigation

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
            })
        ); // User Location
        map.addControl(new mapboxgl.ScaleControl()); // Scale on the map

        mapObj.value = map;
    });
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

onMounted(() => {
    initialiseMap();
});

onBeforeUnmount(() => {
    if (mapObj.value) {
        mapObj.value.remove();
        mapObj.value = null;
    }
});
</script>

<style scoped>
.mapboxgl-crtl-logo {
    display: block !important;
}
</style>
