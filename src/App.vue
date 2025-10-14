<script setup>
import WebHeader from './components/WebHeader.vue';
import WebFooter from './components/WebFooter.vue';
import { auth } from './firebase/init';
import { onAuthStateChanged } from 'firebase/auth';
import { RouterView } from 'vue-router';
import { authStore } from './stores/user';

const authState = authStore();

onAuthStateChanged(auth, () => {
    authState.initAuth();
});
</script>

<template>
    <header>
        <WebHeader />
    </header>
    <main><RouterView /></main>
    <footer><WebFooter /></footer>
</template>

<style>
h1 {
    color: blueviolet;
}

h2 {
    color: greenyellow;
}
</style>
