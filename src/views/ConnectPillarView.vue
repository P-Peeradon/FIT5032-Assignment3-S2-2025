<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-2 h1 text-center text-primary">CONNECT Pillar</h1>
        <figure class="text-center">
            <blockquote class="blockquote">
                <q class="mt-3 mx-4 px-4"
                    >Young people should be at the forefront of global change and innovation.
                    Empowered, they can be key agents for development and peace. If, however, they
                    are left on society's margins, all of us will be impoverished</q
                >
            </blockquote>

            <figcaption class="blockquote-footer">
                <span>Kofi Annan (1938-2018)</span>
            </figcaption>
        </figure>

        <hr class="border border-primary border-2" />

        <!-- All features contain in this application. -->
        <h2 class="my-3 h2 text-secondary">Features for CONNECT</h2>
        <div v-if="connectFeatures" class="d-flex flex-column flex-lg-row justify-content-center">
            <div v-for="feature in connectFeatures" :key="feature.title">
                <FeatureShowcase :feature="feature" />
            </div>
        </div>
        <br />
    </div>
</template>

<script setup>
import { Feature } from '../assets/feature.js';

import { onMounted, ref, computed } from 'vue';
import FeatureShowcase from '../components/FeatureShowcase.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init.js';

const fetchedFeatures = ref([]);
const connectFeatures = computed(() => {
    return fetchedFeatures.value.filter((feature) => feature.pillar === 'CONNECT');
});

onMounted(async () => {
    try {
        const featuresRef = collection(db, 'features');
        const snap = await getDocs(featuresRef);
        const features = [];

        snap.forEach((d) => {
            let data = d.data();

            features.push(
                new Feature({
                    title: data.title,
                    pillar: data.pillar,
                    description: data.description,
                })
            );
        });

        fetchedFeatures.value = features;
    } catch (error) {
        console.error('Error in fetching web features.', error);
    }
});
</script>

<style></style>
