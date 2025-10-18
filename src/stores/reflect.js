import { defineStore } from 'pinia';
import { Hotline } from '../assets/hotline.js';
import { ref } from 'vue';
import axios from 'axios';

// Collect all hotline in users' area.
// Currently, Melbourne, Sydney, Adelaide, Auckland, Singapore
// Sometimes, these hotline contact can be saved by users.
const saferStore = defineStore('safety-net', () => {
    const allHotlines = ref([]);
    const isLoaded = ref(false);
    const lastUpdated = ref(new Date());

    async function fetchAllHotlines() {
        try {
            const { data } = await axios.get('https://fetchallhotlines-qbseni5s5q-uc.a.run.app');

            for (const hotline of data) {
                try {
                    const newHotline = new Hotline({ ...hotline });
                    allHotlines.value.push(newHotline);
                } catch (e) {
                    // Log the exact problematic data item and continue the loop
                    console.error('Failed to construct Hotline for data:', hotline, e);
                    // You can skip this bad item or push a placeholder
                    allHotlines.value.push(
                        new Hotline({ title: 'Error Loading', description: 'Placeholder' })
                    );
                }
            }
        } catch (error) {
            console.error(`Error in fetching hotlines: ${error.message}`);
        }
    }

    return { allHotlines, isLoaded, lastUpdated, fetchAllHotlines };
});

/*
// Focus on what user did.
const hotlineStore = defineStore('hotline', () => {
    const lastContact = ref('');
    const timeStamp = ref(new Date());
    const hasCompletedFollowUp = ref(false);
    const action = ref('');
    const nextFollowUp = ref(null);
    const actualFollowUp = ref(new Date());

    function followUp() {}

    return { lastContact, action, timeStamp, hasCompletedFollowUp, nextFollowUp };
});
*/

export { saferStore };
