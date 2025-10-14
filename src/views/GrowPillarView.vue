<template>
    <div class="container-fluid">
        <h1 class="mt-2 h1 text-center text-primary">GROW Pillar</h1>

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
        <h2 class="my-3 h2 text-secondary">Features for GROW</h2>

        <div
            v-if="featureState.growFeatures"
            class="d-flex flex-column flex-lg-row justify-content-center"
        >
            <div v-for="feature in featureState.growFeatures" :key="feature.title">
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
    await featureState.fetchFeatures();
});
</script>

<style></style>
