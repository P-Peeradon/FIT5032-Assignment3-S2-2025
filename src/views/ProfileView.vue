<template>
    <div class="container-fluid">
        <h1>User Profile</h1>
    </div>
</template>

<script setup>
import { auth } from '../firebase/init';
import { authStore, userStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted } from 'vue';

const userState = userStore();
const authState = authStore();

const uid = userState.uid; // Use this for authentication

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
});
</script>

<style></style>
