<template>
    <div class="container-fluid">
        <h1>User Profile</h1>
    </div>
</template>

<script setup>
import { authStore, userStore } from '@/stores/user';
import { onMounted } from 'vue';

const userState = userStore();
const authState = authStore();

const uid = userState.uid; // Use this for authentication

onMounted(() => {
    authState.initAuth();
});
</script>

<style></style>
