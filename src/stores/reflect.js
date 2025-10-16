import { defineStore } from 'pinia';
import { ref } from 'vue';

// Collect all hotline in users' area.
// Currently, Melbourne, Sydney, Adelaide, Auckland, Singapore
// Sometimes, these hotline contact can be saved by users.
const saferStore = defineStore('safety-net', () => {
    const allHotlines = ref([]);
    const isLoaded = ref(false);
    const lastUpdated = ref(new Date());

    async function fetchAllHotline()

    return { allHotlines, isLoaded, lastUpdated };
});

// Focus on what user did.
const hotlineStore = defineStore('hotline', () => {
    const threeLastContact = ref(['', '', '']);
});

export { saferStore, hotlineStore };
