<template>
    <div v-if="community" class="card border-info">
        <router-link :to="path" style="text-decoration: none; color: black">
            <img :src="thumbnailPath" :alt="community.name" class="card-img-top" />
            <div class="card-body">
                <h4 class="card-title h4 text-primary text-decoration-underline">
                    {{ community.name }} ({{ community.abbrev }})
                </h4>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { onErrorCaptured } from 'vue';
import { Community } from '../assets/community';

const props = defineProps({
    community: {
        type: Community,
        required: true,
    },
});

const community = props.community;

const path = `/connect/community/${community.cid}`;

const thumbnailPath = `../../public/community/${community.abbrev.toLowerCase()}-thumbnail.png`;

onErrorCaptured((err, instance, info) => {
    console.error('Caught a component error:', err, info);
    // Return false to stop the error from propagating further up
    return false;
});
</script>

<style scoped>
.card {
    width: 16rem;
    height: 12rem;
}
</style>
