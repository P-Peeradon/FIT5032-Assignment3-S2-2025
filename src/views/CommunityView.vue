<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-2 h1 text-center text-primary">Community</h1>
        <div class="row">
            <main class="col-7 col-xl-8">
                <div class="d-flex flex-row justify-content-center px-auto">
                    <img
                        src="/public/connect/community.jpg"
                        alt="community"
                        style="width: 48rem; height: 32rem"
                    />
                </div>
                <figure class="text-center">
                    <blockquote class="blockquote">
                        <q class="mt-3 mx-4 px-4"
                            >The future belongs to our youth... younger people must take over. They
                            must seek and cherish the most basic condition for peace, namely unity
                            in our diversity, and find lasting ways to that goal.</q
                        >
                    </blockquote>

                    <figcaption class="blockquote-footer">
                        <span>Nelson Mandela (1918-2013)</span>
                    </figcaption>
                </figure>
            </main>

            <aside class="col-5 col-xl-4">
                <!--Side menu (Coming soon)-->

                <!--Map Component-->
                <div v-if="communities">
                    <MapComponent
                        :layers="['community', 'university']"
                        :center="[144.9595, -37.8009]"
                    />
                </div>
            </aside>
        </div>

        <hr class="border border-primary border-2" />

        <h2 class="my-3 h2 text-secondary">Explore community</h2>

        <div class="px-5">
            <div class="row g-2 mt-2">
                <div class="col-6 col-lg-8">
                    <label for="nameSearch" class="form-label">Search by name or Abbrevation</label>
                    <input
                        type="text"
                        id="nameSearch"
                        placeholder="Search club by name"
                        class="form-control"
                        v-model="query"
                    />
                </div>
                <div class="col-6 col-lg-4">
                    <label for="location" class="form-label">Search by Location</label>
                    <select
                        id="location"
                        placeholder="Location"
                        v-model="location"
                        class="form-select"
                    >
                        <option value="" default></option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Adelaide">Adelaide</option>
                        <option value="Auckland">Auckland</option>
                        <option value="Singapore">Singapore</option>
                    </select>
                </div>
            </div>
            <h3 class="my-3 h3 text-info">Which community you looking for?</h3>
            <p>
                You can select the city you prefer, or type in your interests, separated by commas,
                to filter out the club that might fit with your passion.
            </p>
            <div
                v-if="displayedCommunity"
                class="row row-cols-2 row-cols-md-3 row-cols-xl-4 gap-3 d-flex flex-row"
            >
                <div v-for="community in displayedCommunity" :key="community.cid">
                    <CommunityShowcase :community="community" />
                </div>
            </div>
        </div>
        <br />
    </div>
</template>

<script setup>
import { Community } from '../assets/community';
import CommunityShowcase from '../components/CommunityShowcase.vue';
import MapComponent from '../components/MapComponent.vue';
import { authStore } from '../stores/user';
import { auth } from '../firebase/init';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref, computed } from 'vue';

const authState = authStore();
const query = ref('');
const location = ref('');
const communities = ref([]);
const displayedCommunity = computed(() => {
    return communities.value.filter((community) => {
        return (
            (community.name.toLowerCase().includes(query.value.toLowerCase()) ||
                community.abbrev.toLowerCase().includes(query.value.toLowerCase())) &&
            (location.value !== '' ? community.location === location : true)
        );
    });
});

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });

    const { data } = await axios.get('https://fetchallcommunities-qbseni5s5q-uc.a.run.app');

    communities.value = data.map((community) => new Community(community));
});
</script>

<style scoped></style>
