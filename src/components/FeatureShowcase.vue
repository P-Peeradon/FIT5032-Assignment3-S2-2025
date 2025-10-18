<template>
    <div class="card" id="feature">
        <router-link :to="path" style="text-decoration: none; color: black">
            <img
                v-if="feature && feature.pillar"
                :src="imgURL"
                :alt="feature.title"
                class="card-img-top"
            />
            <div class="card-body">
                <h4 class="card-title h4 text-info text-decoration-underline">
                    {{ feature.title }}
                </h4>
                <p class="card-text">{{ feature.description }}</p>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { Feature } from '../assets/feature';

const prop = defineProps({
    feature: {
        type: Feature, // Please replace with class name, as we want to ensure that the object is correct instance.
        required: true,
    },
});

const feature = ref(new Feature());
const path = computed(() => {
    return `/${feature.value.pillar.toLowerCase()}/${feature.value.title}`;
});

const imgURL = computed(() => {
    return feature.value
        ? `/public/${feature.value.pillar.toLowerCase()}/${feature.value.title.toLowerCase()}.jpg`
        : '../assets/WebLogo.png';
});

onMounted(() => {
    if (prop.feature) {
        feature.value = prop.feature;
    }
});
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
