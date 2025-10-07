<template>
    <div class="container-fluid">
        <h1 class="mt-2">Register to Chillax Corner</h1>
        <RegisterForm @register="handleCreateUser" />
    </div>
</template>

<script setup>
import axios from 'axios';
import RegisterForm from '../forms/RegisterForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCreateUser = async (payload) => {
    try {
        await axios.post(, payload); // To firebase auth
        await axios.post(, payload); // To firebase Firestore
    } catch (error) {
        console.error(`Error in request for creating new user: ${error}`);
    }

    router.push('/login')
};
</script>

<style scoped></style>
