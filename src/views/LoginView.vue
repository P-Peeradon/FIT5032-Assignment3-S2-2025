<template>
    <div class="container-fluid">
        <h1>Login to Chillax Corner</h1>
        <LoginForm @login="authorise(email, password)" />
    </div>
</template>

<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../forms/LoginForm.vue';
import { auth } from '../firebase/init';

const authorise = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password); // Danger!
    } catch (error) {
        console.error(`Error in signing in: ${error}`);
    }
};
</script>

<style></style>
