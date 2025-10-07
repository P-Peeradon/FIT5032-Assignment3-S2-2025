<template>
    <div class="container-fluid">
        <h1 class="mt-2">Connect PILLAR</h1>
        <q class="my-3"
            >Young people should be at the forefront of global change and innovation. Empowered,
            they can be key agents for development and peace. If, however, they are left on
            society's margins, all of us will be impoverished<span>Kofi Annan (1938-2018)</span></q
        >

        <!-- All features contain in this application. -->
        <h2>Features for CONNECT</h2>
        <div class="d-flex flex-column flex-lg-row">
            <div v-for="feature in connectFeatures" :key="feature.title">
                <FeatureShowcase :feature="feature" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Feature } from '@/assets/feature';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import FeatureShowcase from '../components/FeatureShowcase.vue';

const fetchedFeatures = ref([]);
const connectFeatures = computed(() => {
    return fetchedFeatures.value.filter((feature) => feature.pillar === 'CONNECT');
});

onMounted(async () => {
    try {
        const features = await axios.get(); //Function to fetch all features.

        for (const feature in features) {
            fetchedFeatures.value.push(Feature(...feature));
        }
    } catch (error) {
        console.error('Error in fetching web features.', error);
    }
});
</script>

<style></style>
