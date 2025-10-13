<template>
    <div class="card" id="feature">
        <router-link :to="path" style="text-decoration: none; color: black">
            <img :src="imgURL" :alt="feature.title" class="card-img-top" />
            <div class="card-body">
                <h4 class="card-title">{{ feature.title }}</h4>
                <p class="card-text">{{ feature.description }}</p>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { Feature } from '../assets/feature';

const prop = defineProps({
    feature: {
        type: Feature, // Please replace with class name, as we want to ensure that
        required: true,
    },
});

const feature = prop.feature;
const path = `/connect/${feature.getTitle()}`;
const imgURL = `/src/assets/${encodeURIComponent(
    feature.getPillar().toLowerCase()
)}/${encodeURIComponent(feature.getTitle().toLowerCase())}.jpg`;
</script>

<style scoped>
#feature {
    width: 64rem;
    height: 48rem;
}
img {
    width: 64rem;
    height: auto;
}
</style>
