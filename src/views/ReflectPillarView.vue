<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-3 h1 text-center text-primary">REFLECT Pillar</h1>

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

        <div
            v-if="featureState.reflectFeatures"
            class="d-flex flex-column flex-lg-row justify-content-center"
        >
            <div v-for="feature in featureState.reflectFeatures" :key="feature.title">
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
