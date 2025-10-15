<template>
    <div class="card border-info">
        <img :src="thumbnailPath" alt="" class="img-fluid card-img-top" />
        <div class="card-body"></div>
    </div>
</template>

<script setup>
import { Community } from '../assets/community';

const props = defineProps({
    community: {
        type: Community,
        required: true,
    },
});

const thumbnailPath = ref(
    `../../public/community/${props.community.abbrev.toLowerCase()}-thumbnail.png`
);
</script>

<style scoped>
.card {
    width: 24px;
    height: 18px;
}
</style>
