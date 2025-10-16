<template>
    <div class="container-fluid">
        <h1 class="mt-2">Register to Chillax Corner</h1>
        <RegisterForm @register="handleCreateUser" @google-auth="handleGoogleAuth" />
    </div>
</template>

<script setup>
import api from '../../axios.js';
import RegisterForm from '../forms/RegisterForm.vue';
import { useRouter } from 'vue-router';
import { authStore } from '../stores/user';

const authState = authStore();
const router = useRouter();

const handleGoogleAuth = async (payload) => {
    try {
        const username = await authState.signInWithGoogle(payload.role);

        await api.post('/register/email', {
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
        await api.post('/validate/register', payload);
    } catch (error) {
        console.error(`${error.code}: Validation Error: ${error.message}`);
        return;
    }

    try {
        await api.post('/register/auth', payload);

        await api.post('/register/firestore', payload);

        await api.post('/register/email', payload);
        router.push('/login');
    } catch (error) {
        console.error(`${error.code}: Error in creating new user: ${error.message}`);
    }
};
</script>

<style scoped></style>
