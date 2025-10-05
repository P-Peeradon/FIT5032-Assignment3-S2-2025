<template>
    <div class="container-fluid">
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

<style></style>
