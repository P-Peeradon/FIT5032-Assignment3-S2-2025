<template>
    <nav class="container-fluid bg-info d-flex flex-row pt-2 pb-2 mt-lg-0 justify-content-end">
        <div v-if="!isAuthenticated" class="btn-group me-5" role="group">
            <router-link class="btn btn-secondary" to="/register"> Register </router-link>
            <router-link class="btn btn-primary" to="/login">Login</router-link>
        </div>
        <div v-else class="btn-group">
            <p class="me-3">{{ userState.username }}</p>
            <button class="btn btn-danger">Logout</button>
        </div>
    </nav>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { userStore } from '../stores/user.js';
import { ref } from 'vue';
import { auth } from '../firebase/init';

const isAuthenticated = ref(false);
const userState = userStore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        isAuthenticated.value = true;
    } else {
        isAuthenticated.value = false;
    }
});
</script>

<style></style>
