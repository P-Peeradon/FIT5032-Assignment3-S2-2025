<template>
    <div class="container-fluid">
        <h1>{{ article.title }}</h1>
    </div>
</template>

<script setup>
import { Article } from '../assets/article';
import { ref, computed, onMounted } from 'vue';

import { authStore } from '../stores/user';

const authState = authStore();
const fetchedArticles = ref([]);

const sortByTitle = () => {
    fetchedArticles.value.sort((a, b) => a.title.localeCompare(b.title));
};

watch();

onMounted(() => {
    authState.initAuth();
});
</script>

<style></style>
