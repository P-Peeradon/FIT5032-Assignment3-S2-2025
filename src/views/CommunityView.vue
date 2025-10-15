<template>
    <div class="container-fluid">
        <h1 class="mt-2 text-primary text-align-center">Community</h1>
        <main class="col-9 col-xl-8">
            <div class="row">
                <p>
                    <q
                        >The future belongs to our youth... younger people must take over. They must
                        seek and cherish the most basic condition for peace, namely unity in our
                        diversity, and find lasting ways to that goal.</q
                    >
                    <br />
                    <cite><span>Nelson Mandela (1918-2013)</span></cite>
                </p>
            </div>
            <hr />

            <div class="row g-2 mt-2">
                <div class="col-6 col-lg-4 form-floating">
                    <input
                        type="text"
                        id="nameSearch"
                        placeholder="Search club by name"
                        class="form-control"
                        v-model="query"
                    />
                </div>
                <div class="col-6 col-lg-8 form-floating">
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
            <h3 class="mt-3">Which community you looking for?</h3>
            <p>
                You can select the city you prefer, or type in your interests, separated ny commas,
                to filter out the club that might fit with your passion.
            </p>
            <div class="row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                <div v-for="community in displayedCommunity" :key="community.cid">
                    <CommunityShowcase :community="community" />
                </div>
            </div>
        </main>

        <aside class="col-3 col-xl-4">
            <!--Side menu (Coming soon)-->
        </aside>
    </div>
</template>

<script setup>
import { Community } from '../assets/community';
import { authStore } from '../stores/user';
import { onMounted, ref, computed } from 'vue';

const authState = authStore();
const query = ref('');
const location = ref('');
const communities = ref([]);
const displayedCommunity = computed(() => {
    return communities.filter((community) => {
        return (
            (communities.name.toLowerCase.includes(query.value.toLowerCase()) ||
                communities.abbrev.toLowerCase.includes(query.value.toLowerCase())) &&
            (location.value !== '' ? community.location === location : true)
        );
    });
});

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
    const response = await axios.get('http://localhost:3000/connect/community');
    communities.value = response.data.map((community) => new Community(community));
});
</script>

<style scoped></style>
