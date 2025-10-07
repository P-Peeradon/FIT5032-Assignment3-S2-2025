<template>
    <div class="card" id="feature">
        <router-link to="/">
            <img :src="{}" alt="" class="card-img-top" />
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
</script>

<style scoped>
#feature {
    width: 16rem;
    height: 12rem;
}
</style>
