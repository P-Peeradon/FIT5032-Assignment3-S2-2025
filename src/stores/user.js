import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '../firebase/init';
import { onAuthStateChanged } from 'firebase/auth';

const authStore = defineStore('auth', () => {
    const currentUser = ref(null);
    const authLoad = ref(false);
    const userID = computed(() => {
        return currentUser.value ? currentUser.value.uid : null;
    });
    const isAuthenticated = computed(() => {
        return currentUser.value.isnull() ? true : false;
    });

    const initAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            authLoad.value = true;
            if (user) {
                currentUser.value = await {
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                };
            } else {
                currentUser.value = null;
            }
            authLoad.value = false;
        });
    };
});

const userStore = defineStore('user', () => {
    const uid = authStore.userID;
    const email = ref('');
    const role = ref('');
    const username = ref('');
    const journals = ref([]);
    const communities = ref([]);

    const fetchUserData = async () => {
        try {
            const userState = await axios.get('', { userId: uid });

            email.value = userState.email;
            role.value = userState.role;
            username.value = userState.username;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserJournal = async () => {
        try {
            const userJournal = await axios.get('', { userId: uid, role: role.value }); // API that get user journal

            journals.value = userJournal;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserCommunity = async () => {
        try {
            const userCommunity = await axios.get('', { userId: uid, role: role.value }); // API that get user community

            communities.value = userCommunity;
        } catch (error) {
            console.error(error);
        }
    };
});

export { authStore, userStore };
