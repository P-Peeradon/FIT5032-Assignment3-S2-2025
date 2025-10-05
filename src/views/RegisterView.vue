<template>
    <div class="container-fluid">
        <h1 class="mt-2">Register to Chillax Corner</h1>
        <RegisterForm @register="handleCreateUser(email, password)" />
    </div>
</template>

<script setup>
import RegisterForm from '../forms/RegisterForm.vue';
import { authStore } from '../stores/user';

const authState = authStore();
const handleCreateUser = async (email, password) => {
    await authState.createUser(email, password);
};
</script>

<style scoped></style>
