<template>
    <nav class="container-fluid bg-info d-flex flex-row pt-2 pb-2 mt-lg-0 justify-content-end">
        <div v-if="authState.isAuthenticated" class="btn-group">
            <p class="me-3">{{}}</p>
            <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
        <div v-else class="btn-group me-5" role="group">
            <router-link class="btn btn-light" to="/register"> Register </router-link>
            <router-link class="btn btn-primary" to="/login">Login</router-link>
        </div>
    </nav>
</template>

<script setup>
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { authStore, userStore } from '../stores/user.js';
import { onMounted } from 'vue';
import { auth } from '../firebase/init';
import { useRouter } from 'vue-router';

const authState = authStore();
const userState = userStore();

const router = useRouter();

const logout = async () => {
    try {
        await signOut(auth);

        router.push('/login');
    } catch (error) {
        console.error(`Error in logging out: ${error.message}`);
    }
};

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
        if (user) {
            const token = await user.getIdToken();

            await userState.fetchUserData();
        }
    });
});
</script>

<style></style>
