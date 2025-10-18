<template>
    <div class="container-fluid">
        <h1>Login to Chillax Corner</h1>
        <LoginForm @login="authorise" @google-auth="googleSignIn" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { auth } from '../firebase/init';
import LoginForm from '../forms/LoginForm.vue';
import { authStore } from '../stores/user';
import axios from 'axios';

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
        await axios.post('https://loginuser-qbseni5s5q-uc.a.run.app', payload); // Sign in using cloud function

        console.log(auth.currentUser);
        router.push('/');
    } catch (error) {
        console.error(`Error in signing in: ${error}`);
    }
};
</script>

<style></style>
