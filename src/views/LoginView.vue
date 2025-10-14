<template>
    <div class="container-fluid">
        <h1>Login to Chillax Corner</h1>
        <LoginForm @login="authorise" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { auth } from '../firebase/init';
import LoginForm from '../forms/LoginForm.vue';

const router = useRouter();

const authorise = async (payload) => {
    try {
        await axios.post('http://localhost:3000/validate/login', payload);
    } catch (error) {
        console.error(`${error.code}: Validation Error: ${error.message}`);
        return;
    }

    try {
        await axios.post('http://localhost:3000/login', payload); // Sign in using cloud function
    } catch (error) {
        console.error(`Error in signing in: ${error}`);
    }

    router.push('/');
    console.log(auth.currentUser);
};
</script>

<style></style>
