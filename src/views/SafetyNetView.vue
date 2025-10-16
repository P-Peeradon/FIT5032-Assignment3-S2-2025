<template>
    <div class="container-fluid">
        <h1>Safety Net</h1>

        <h2>It's OK not to feel OK</h2>
        <p>
            Sometimes, you may need someone who will understand your thought and ready to assist you
            in case of overwhelming or mentally insecure. But please do not worry, these hotline OK
            to assist you for confidential services, so please be sure that you will be safe in
            Chillax Corner
        </p>

        <DataTable>
            <Column></Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { authStore } from '../stores/user';
import { saferStore } from '../stores/reflect';
import api from '../../axios.js';
import { onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';

const authState = authStore();

const saferState = saferStore();

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
});
</script>

<style></style>
