<template>
    <div class="container-fluid">
        <h1 class="mt-2 h1 text-center">GROW Pillar</h1>

        <figure class="text-center">
            <blockquote class="blockquote mx-4 px-4">
                <q class="mt-3"
                    >In a world filled with hate, we must still dare to hope. In a world filled with
                    anger, we must still dare to comfort. In a world filled with despair, we must
                    still dare to dream. And in a world filled with distrust, we must still dare to
                    believe.</q
                >
            </blockquote>

            <figcaption class="blockquote-footer">
                <span>Michael Jackson (1958-2009)</span>
            </figcaption>
        </figure>
        <hr class="border border-primary border-2" />

        <!-- All features contain in this application. -->
        <h2>Features for GROW</h2>

        <div v-if="growFeatures" class="d-flex flex-column flex-lg-row">
            <div v-for="feature in growFeatures" :key="feature.title">
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
const growFeatures = computed(() => {
    return fetchedFeatures.value.filter((feature) => feature.pillar === 'GROW');
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
