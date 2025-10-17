import { defineStore } from 'pinia';
import { Hotline } from '../assets/hotline.js';
import { ref } from 'vue';

// Collect all hotline in users' area.
// Currently, Melbourne, Sydney, Adelaide, Auckland, Singapore
// Sometimes, these hotline contact can be saved by users.
const saferStore = defineStore('safety-net', () => {
    const allHotlines = ref([]);
    const isLoaded = ref(false);
    const lastUpdated = ref(new Date());

    async function fetchAllHotlines() {
        try {
            const response = await axios.get('https://fetchallhotlines-qbseni5s5q-uc.a.run.app');
            allHotlines.value = response.data.map((hotline) => new Hotline(hotline));
        } catch (error) {
            console.error(`Error in fetching hotlines: ${error.message}`);
        }
    }

    return { allHotlines, isLoaded, lastUpdated, fetchAllHotlines };
});

// Focus on what user did.
const hotlineStore = defineStore('hotline', () => {
    const lastContact = ref('');
    const timeStamp = ref(new Date());
    const hasCompletedFollowUp = ref(false);
    const action = ref('');
    const nextFollowUp = ref(null);
    const actualFollowUp = ref(new Date());

    function followUp() {}

    return lastContact, action, timeStamp, hasCompletedFollowUp, nextFollowUp;
});

export { saferStore, hotlineStore };
