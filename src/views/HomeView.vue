<script setup>
import { onMounted } from 'vue';
import { authStore } from '../stores/user';

const authState = authStore();

onMounted(() => {
    authState.initAuth();
});
</script>

<template>
    <main class="container-fluid">
        <p>Website Home Page</p>
    </main>
</template>
