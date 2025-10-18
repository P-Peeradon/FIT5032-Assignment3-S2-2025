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
        <div
            v-if="featureState.connectFeatures"
            class="d-flex flex-column flex-lg-row justify-content-center"
        >
            <div v-for="feature in featureState.connectFeatures" :key="feature.title">
                <FeatureShowcase :feature="feature" />
            </div>
        </div>
        <br />
    </div>
</template>

<script setup>
import FeatureShowcase from '../components/FeatureShowcase.vue';
import { onMounted } from 'vue';

import { onAuthStateChanged } from 'firebase/auth';
import { authStore, featureStore } from '../stores/user.js';
import { auth } from '../firebase/init.js';

const authState = authStore();
const featureState = featureStore();

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
    if (featureState.features.value.length === 0) await featureState.fetchFeatures();
});
</script>

<style></style>
