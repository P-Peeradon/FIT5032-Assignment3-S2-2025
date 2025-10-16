<template>
    <div class="container-fluid">
        <h1>Login to Chillax Corner</h1>
        <LoginForm @login="authorise" @google-auth="googleSignIn" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { auth } from '../firebase/init';
import api from '../../axios.js';
import LoginForm from '../forms/LoginForm.vue';
import { authStore } from '../stores/user';

const authState = authStore();
const router = useRouter();

const googleSignIn = async (payload) => {
    try {
        await authState.signInWithGoogle();

        router.push('/');
    } catch (error) {
        console.error('Google login error: ', error.message);
    }
};

const authorise = async (payload) => {
    try {
        await api.post('/api/validate/login', payload);
    } catch (error) {
        console.error(`${error.code}: Validation Error: ${error.message}`);
        return;
    }

    try {
        await api.post('/api/login', payload); // Sign in using cloud function

        console.log(auth.currentUser);
        router.push('/');
    } catch (error) {
        console.error(`Error in signing in: ${error}`);
    }
};
</script>

<style></style>
