import { defineStore } from 'pinia';
import { db } from '../firebase/init';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { Community } from '../assets/community';
import { ref, computed } from 'vue';

const communityStore = defineStore('community', () => {
    const community = ref(null);

    const isLoading = ref(false);
    const isLoaded = computed(() => {
        return community.value !== null;
    });

    const loadCommunity = async (cid) => {
        isLoading.value = true;
        try {
            const communitiesRef = collection(db, 'communities');
            const q = query(communitiesRef, where('cid', '==', cid));
            const snapshot = await getDocs(q); // Should only return one document

            if (snapshot.docs.length > 0) {
                let data = snapshot.docs[0].data();

                community.value = new Community({
                    ...data,
                });
            }
        } catch (error) {
            console.error(`Error in fetching community: ${error.message}`);
            community.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    return { community, isLoaded, loadCommunity };
});

export { communityStore };
