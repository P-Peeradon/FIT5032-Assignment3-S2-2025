<template>
    <div class="container-fluid">
        <h1>{{ article.title }}</h1>
    </div>
</template>

<script setup>
import { Article } from '../assets/article';
import { ref, onMounted } from 'vue';

import { authStore } from '../stores/user';
import { articleStore } from '../stores/grow';

const authState = authStore();
const articleState = articleStore();

onMounted(() => {
    authState.initAuth();
});
</script>

<style></style>
