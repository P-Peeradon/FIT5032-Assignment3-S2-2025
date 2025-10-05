<template>
    <div class="container-fluid">
        <RegisterForm @register="handleCreateUser" />
    </div>
</template>

<script setup>
import RegisterForm from '../forms/RegisterForm.vue';
import { authStore } from '../stores/user';

const authState = authStore();
const handleCreateUser = () => {
    authState.createUser();
};
</script>

<style></style>
