<template>
    <div class="container-fluid">
        <h1 class="mt-2">Register to Chillax Corner</h1>
        <RegisterForm @register="handleCreateUser" @google-auth="handleGoogleAuth" />
    </div>
</template>

<script setup>
import axios from 'axios';
import RegisterForm from '../forms/RegisterForm.vue';
import { useRouter } from 'vue-router';
import { authStore } from '../stores/user';

const authState = authStore();
const router = useRouter();

const handleGoogleAuth = async (payload) => {
    try {
        const username = await authState.signInWithGoogle(payload.role);

        await axios.post('https://chillax-corner.pages.dev/register/email', {
            username: username,
            email: payload.email,
        });

        router.push('/');
    } catch (error) {
        console.error(`Google Auth Error ${error.message}`);
    }
};

const handleCreateUser = async (payload) => {
    try {
        await axios.post('http://chillax-corner.pages.dev/validate/register', payload);
    } catch (error) {
        console.error(`${error.code}: Validation Error: ${error.message}`);
        return;
    }

    try {
        await axios.post('https://chillax-corner.pages.dev/register/auth', payload);

        await axios.post('https://chillax-corner.pages.dev/register/firestore', payload);

        await axios.post('https://chillax-corner.pages.dev/register/email', payload);
        router.push('/login');
    } catch (error) {
        console.error(`${error.code}: Error in creating new user: ${error.message}`);
    }
};
</script>

<style scoped></style>
