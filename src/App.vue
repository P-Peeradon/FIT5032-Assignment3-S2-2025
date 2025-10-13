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

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
