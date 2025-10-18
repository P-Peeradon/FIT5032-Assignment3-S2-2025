<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-2 h1 fs-2 text-center text-primary">Community Details</h1>
        <h2 class="mt-2 px-3 h2 fs-4">
            {{ communityState.community.name }} ({{ communityState.community.abbrev }})
        </h2>
    </div>
</template>

<script setup>
import { auth } from '../firebase/init';
import { communityStore } from '../stores/connect';
import { authStore, userStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const authState = authStore();
const userState = userStore();
const communityState = communityStore();

const cid = ref(route.params.cid);

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
    await communityState.loadCommunity(cid.value);
});
</script>

<style></style>
