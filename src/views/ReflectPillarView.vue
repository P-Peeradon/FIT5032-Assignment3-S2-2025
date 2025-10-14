<template>
    <div class="container-fluid">
        <h1 class="mt-2 h1 text-center text-primary">REFLECT Pillar</h1>

        <figure class="text-center">
            <blockquote class="blockquote mx-4 px-4">
                <q class="mt-3"
                    >Watch your thoughts, for they will become actions. Watch your actions, for
                    they'll become habits. Watch your habits for they will forge your character.
                    Watch your character, for it will make your destiny</q
                >
            </blockquote>

            <figcaption class="blockquote-footer">
                <span>Margaret Thatcher (1925-2013)</span>
            </figcaption>
        </figure>
        <hr class="border border-primary border-2" />

        <!-- All features contain in this application. -->
        <h2 class="my-3 h2 text-secondary">Features for REFLECT</h2>

        <div v-if="reflectFeatures" class="d-flex flex-column flex-lg-row justify-content-center">
            <div v-for="feature in reflectFeatures" :key="feature.title">
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
const reflectFeatures = computed(() => {
    return fetchedFeatures.value.filter((feature) => feature.pillar === 'REFLECT');
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
