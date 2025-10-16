<template>
    <div class="container-fluid">
        <h1>Register New Community</h1>
        <RegisterCommunityForm @register-community="addCommunity" />
    </div>
</template>

<script setup>
import RegisterCommunityForm from '../forms/RegisterCommunityForm.vue';
import api from '../../axios.js';

const addCommunity = async (payload) => {
    try {
        await api.post('/validate/community/register', payload);
    } catch (error) {
        console.error(`${error.code}: Validation Error: ${error.message}`);
        return;
    }

    try {
        await api.post('/connect/community/register');
    } catch (error) {
        console.error(`${error.code}: Error in register new community: ${error.message}`);
    }
};
</script>

<style></style>
