<template>
    <nav class="container-fluid bg-info d-flex flex-row pt-2 pb-2 mt-lg-0 justify-content-end">
        <div v-if="!authState.isAuthenticated" class="btn-group me-5" role="group">
            <router-link class="btn btn-secondary" to="/register"> Register </router-link>
            <router-link class="btn btn-primary" to="/login">Login</router-link>
        </div>
        <div v-else class="btn-group">
            <p class="me-3">{{ userState.username }}</p>
            <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
    </nav>
</template>

<script setup>
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { authStore, userStore } from '../stores/user.js';
import { onMounted } from 'vue';
import { auth } from '../firebase/init';

const authState = authStore();
const userState = userStore();

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(`Error in logging out: ${error.message}`);
    }
};

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        authState.initAuth();
    });
});
</script>

<style></style>
