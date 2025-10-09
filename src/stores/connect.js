import { defineStore } from 'pinia';
import { ref } from 'vue';

const communityStore = defineStore('community', () => {
    const communities = ref([]);

    const fetchAllCommunity = async () => {
        await axios.get(''); // All communities affiliated with Chillax Corner
    };
});

export { communityStore };
