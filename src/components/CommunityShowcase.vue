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
import { ref, computed, onMounted } from 'vue';
import { Community } from '../assets/community';

const props = defineProps({
    community: {
        type: Community,
        required: true,
    },
});

const community = ref(new Community());

const path = computed(() => {
    return `/connect/community/${community.value.cid}`;
});

const thumbnailPath = computed(() => {
    return `/community/${community.value.cid}-thumbnail.png`;
});

onMounted(() => {
    if (props.community) community.value = props.community;
});
</script>

<style scoped>
.card {
    width: 16rem;
    height: 12rem;
}
</style>
