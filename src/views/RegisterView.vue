<template>
    <div class="container-fluid">
        <h1 class="mt-2">Register to Chillax Corner</h1>
        <RegisterForm @register="handleCreateUser" />
    </div>
</template>

<script setup>
import axios from 'axios';
import RegisterForm from '../forms/RegisterForm.vue';

const handleCreateUser = async (email, password) => {
    try {
        const res = await axios.post();
    } catch (error) {
        console.error(`Error in request for creating new user: ${error}`);
    }
};
</script>

<style scoped></style>
