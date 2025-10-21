<script setup>
import { onMounted } from 'vue';
import { authStore } from '../stores/user';
import WriteEmailForm from '../forms/WriteEmailForm.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';
import axios from 'axios';

const authState = authStore();

const handleSendEmail = async (payload) => {
    try {
        await axios.post('https://writetodev-qbseni5s5q-uc.a.run.app', payload);
    } catch (error) {
        console.error(`Error in writing to development team: ${error.message}`);
    }
};

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
});
</script>

<template>
    <main class="container-fluid">
        <h1 class="mt-2 py-2 h1 text-center text-primary">Website Home Page</h1>
        <WriteEmailForm @send-email="handleSendEmail" />
    </main>
</template>
