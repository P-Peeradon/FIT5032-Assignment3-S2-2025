<script setup>
import { RouterLink, RouterView } from 'vue-router';
import WebHeader from './components/WebHeader.vue';
import WebFooter from './components/WebFooter.vue';
</script>

<template>
    <div style="background-color: bisque">
        <header>
            <WebHeader />
        </header>

        <main>
            <RouterView />
        </main>

        <footer>
            <WebFooter />
        </footer>
    </div>
</template>

<style>
header {
    line-height: 1.5;
    max-height: 100vh;
}

h1 {
    color: blueviolet;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
}

h2 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
