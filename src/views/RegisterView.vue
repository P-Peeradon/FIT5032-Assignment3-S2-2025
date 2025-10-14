<template>
    <div class="container-fluid">
        <h1 class="mt-2">Register to Chillax Corner</h1>
        <RegisterForm @register="handleCreateUser" />
    </div>
</template>

<script setup>
import axios from 'axios';
import RegisterForm from '../forms/RegisterForm.vue';

import { auth } from '../firebase/init';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCreateUser = async (payload) => {
    try {
        await axios.post('http://localhost:3000/validate/register', payload);
    } catch (error) {
        console.error(`${error.code}: Validation Error: ${error.message}`);
        return;
    }

    try {
        await axios.post('http://localhost:3000/register/auth', payload);

        await axios.post('http://localhost:3000/register/firestore', payload);

        alert('Register success');
        console.log(auth.currentUser);
        router.push('/login');
    } catch (error) {
        console.error(`${error.code}: Error in creating new user: ${error.message}`);
    }
};
</script>

<style scoped></style>
