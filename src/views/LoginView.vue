<template>
    <div class="container-fluid">
        <h1>Login to Chillax Corner</h1>
        <LoginForm @login="authorise" />
    </div>
</template>

<script setup>
import LoginForm from '../forms/LoginForm.vue';
import axios from 'axios';

const authorise = async (payload) => {
    try {
        await axios.post(, payload); // Sign in using cloud function
    } catch (error) {
        console.error(`Error in signing in: ${error}`);
    }
};
</script>

<style></style>
