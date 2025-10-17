<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-3 h1 text-center text-primary">Safety Net</h1>
        <div class="row">
            <main class="col-9 col-xl-8">
                <div class="d-flex flex-row justify-content-center px-auto">
                    <img
                        src="../assets/connect/community.jpg"
                        alt="community"
                        style="width: 48rem; height: 32rem"
                    />
                </div>
                <figure class="text-center">
                    <blockquote class="blockquote mx-4 px-4">
                        <q class="mt-3"
                            >Mental health is a vital part of our overall wellbeing, and everyone
                            deserves access to the mental health care and support they need</q
                        >
                    </blockquote>

                    <figcaption class="blockquote-footer">
                        <span>Justin Trudeau (1971-Present)</span>
                    </figcaption>
                </figure>
            </main>
            <aside class="col-3 col-xl-4">
                <!--Side menu (Coming soon)-->

                <!--Map Component-->
                <div v-if="communities"></div>
            </aside>
        </div>

        <hr class="border border-primary border-2" />

        <h2>It's OK not to be OK</h2>
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
