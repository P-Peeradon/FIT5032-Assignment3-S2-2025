<template>
    <div class="container-fluid">
        <h1>Register New Community</h1>
        <RegisterCommunityForm @register-community="addCommunity" />
    </div>
</template>

<script setup>
import RegisterCommunityForm from '@/forms/RegisterCommunityForm.vue';

const addCommunity = () => {};
</script>

<style></style>
