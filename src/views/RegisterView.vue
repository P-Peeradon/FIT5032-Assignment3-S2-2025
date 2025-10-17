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
import { auth } from '../firebase/init.js';

const authState = authStore();
const router = useRouter();

const handleGoogleAuth = async (payload) => {
    try {
        const user = await authState.signInWithGoogle(payload.role);

        await axios.post('https://writewelcomeemail-qbseni5s5q-uc.a.run.app', {
            username: user.displayName,
            email: user.email,
        }); //Write email

        console.log(auth.currentUser);

        router.push('/');
    } catch (error) {
        console.error(`Google Auth Error ${error.message}`);
    }
};

const handleCreateUser = async (payload) => {
    try {
        await axios.post('https://createuser-qbseni5s5q-uc.a.run.app', payload);

        await axios.post('https://recorduser-qbseni5s5q-uc.a.run.app', payload);

        await axios.post('https://writewelcomeemail-qbseni5s5q-uc.a.run.app', payload);
        router.push('/login');
    } catch (error) {
        console.error(`${error.code}: Error in creating new user: ${error.message}`);
    }
};
</script>

<style scoped></style>
