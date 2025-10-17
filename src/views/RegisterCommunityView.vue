<template>
    <div class="container-fluid">
        <h1>Register New Community</h1>
        <RegisterCommunityForm @register-community="addCommunity" />
    </div>
</template>

<script setup>
import RegisterCommunityForm from '../forms/RegisterCommunityForm.vue';
import axios from 'axios';

const addCommunity = async (payload) => {
    try {
        await axios.post('https://createcommunity-qbseni5s5q-uc.a.run.app');
    } catch (error) {
        console.error(`${error.code}: Error in register new community: ${error.message}`);
    }
};
</script>

<style></style>
