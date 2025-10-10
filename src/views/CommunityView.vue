<template>
    <div class="container-fluid">
        <h1 class="mt-2">Community</h1>
        <q class="my-3"
            >The future belongs to our youth... younger people must take over. They must seek and
            cherish the most basic condition for peace, namely unity in our diversity, and find
            lasting ways to that goal<span>Nelson Mandela (1918-2013)</span></q
        >
        <div class="row g-2">
            <div class="col-6 col-lg-4 form-floating">
                <label for="nameSearch">Search club by name</label>
                <input type="text" id="nameSearch" class="search-item" v-model="query" />
            </div>
            <div class="col-6 col-lg-8 form-floating">
                <select v-model="location" class="dropdown">
                    <option value="" default></option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Adelaide">Adelaide</option>
                    <option value="Auckland">Auckland</option>
                    <option value="Singapore">Singapore</option>
                </select>
            </div>
        </div>
        <h3>Which community you looking for</h3>
        <p>
            You can select the city you prefer, or type in your interests, separated ny commas, to
            filter out the club that might fit with your passion.
        </p>

        <div class="row">
            <main class="d-grid col-12 col-xl-8 g-col-6 g-col-md-4 g-col-xl-3 gap-2">
                <div v-for="community in displayedCommunity" :key="community">
                    <!--Card component-->
                </div>
            </main>
            <aside class="col-12 col-xl-4">
                <!--Side menu (Coming soon)-->
            </aside>
        </div>
    </div>
</template>

<script setup>
import { communityStore } from '../stores/connect';
import { authStore } from '../stores/user';
import { onMounted, ref, watch, computed } from 'vue';

const authState = authStore();
const query = ref('');
const location = ref('');
const communityState = communityStore();
const displayedCommunity = ref(communityState.communities);

const locationResult = computed(() => {
    return communityState.communities.filter((community) => {
        if (location.value !== '') return community.location === location.value;
        else return community;
    });
});

const queryResult = computed(() => {
    return communityState.communities.filter((community) => {
        if (query.value !== '') return community.name.includes(query.value);
        else return community;
    });
});

onMounted(() => {
    authState.initAuth();
});

watch((query, location), () => {
    displayedCommunity.value = [...new Set(locationResult).intersect(...new Set(queryResult))];
});
</script>

<style scoped></style>
