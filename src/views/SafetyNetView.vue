<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-3 h1 text-center text-primary">Safety Net</h1>
        <div class="row">
            <main class="col-9 col-xl-8">
                <div class="d-flex flex-row justify-content-center px-auto">
                    <img
                        src="/public/reflect/safetynet.jpg"
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

        <h2 class="my-3 h2 text-secondary">It's OK not to be OK</h2>
        <p>
            Sometimes, you may need someone who will understand your thought and ready to assist you
            in case of overwhelming or mentally insecure. But please do not worry, these hotline OK
            to assist you for confidential services, so please be sure that you will be safe in
            Chillax Corner
        </p>

        <div class="row g-2 mt-2">
            <div class="col-6 col-lg-8">
                <label for="purposeSearch" class="form-label">Search by name or purpose</label>
                <input
                    type="text"
                    id="purposeSearch"
                    placeholder="Search hotline by name or purpose"
                    class="form-control"
                    v-model="query"
                />
            </div>
            <div class="col-6 col-lg-4">
                <label for="location" class="form-label">Search by Location</label>
                <select id="location" placeholder="Location" v-model="location" class="form-select">
                    <option value="" default></option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Adelaide">Adelaide</option>
                    <option value="Auckland">Auckland</option>
                    <option value="Singapore">Singapore</option>
                </select>
            </div>
        </div>
        <DataTable
            v-if="fetchedHotlines"
            :value="displayedHotlines"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 8, 10, 20]"
            tableStyle="min-width: 56rem"
        >
            <Column field="name" sortable header="Name"></Column>
            <Column field="location" header="Location">
                {{ location.join(', ') }}
            </Column>
            <Column field="purpose" header="Purpose"></Column>
            <Column field="contact" header="Contact"></Column>
        </DataTable>
    </div>
</template>

<script setup>
// oxlint-disable no-unused-expressions
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { authStore } from '../stores/user';
import { saferStore } from '../stores/reflect';
import { computed, onMounted, ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';

const authState = authStore();
const saferState = saferStore();

const query = ref('');
const location = ref('');

const fetchedHotlines = ref([]);
const displayedHotlines = computed(() => {
    return fetchedHotlines.value.filter((hotline) => {
        (hotline.name.toLowerCase().includes(query.value.toLowerCase()) ||
            hotline.purpose.toLowerCase().includes(query.value.toLowerCase())) &&
            (location.value !== '' ? hotline.location.includes(location.value) : true);
    });
});

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
    await saferState.fetchAllHotlines();
    fetchedHotlines.value = [...saferState.allHotlines.value];
});
</script>

<style></style>
