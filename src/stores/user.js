import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '../firebase/init';
import { Feature } from '../assets/feature';
import axios from 'axios';

const authStore = defineStore('auth', () => {
    const currentUser = ref(null);
    const authLoad = ref(false);
    const userID = computed(() => {
        return currentUser.value ? currentUser.value.uid : null;
    });
    const isAuthenticated = computed(() => {
        return currentUser.value ? true : false;
    });

    function initAuth() {
        authLoad.value = true;
        let user = auth.currentUser;
        if (user) {
            currentUser.value = user;
        } else {
            currentUser.value = null;
        }
        authLoad.value = false;
    }

    return { currentUser, userID, isAuthenticated, initAuth };
});

const featureStore = defineStore('feature', () => {
    const features = ref([]);
    const connectFeatures = computed(() => {
        return features.value.filter((feature) => feature.pillar === 'CONNECT');
    });
    const reflectFeatures = computed(() => {
        return features.value.filter((feature) => feature.pillar === 'REFLECT');
    });
    const growFeatures = computed(() => {
        return features.value.filter((feature) => feature.pillar === 'GROW');
    });

    const fetchFeatures = async () => {
        try {
            const response = await axios.get('https://getallfeatures-qbseni5s5q-uc.a.run.app');
            features.value = response.data.map((feature) => new Feature(feature));
        } catch (error) {
            console.error(`${error.code}: Error in fetching features: ${error.message}`);
        }
    };

    return { connectFeatures, reflectFeatures, growFeatures, fetchFeatures };
});

const userStore = defineStore('user', () => {
    const email = ref('');
    const role = ref('');
    const username = ref('');
    const journals = ref([]);
    const bookmarks = ref([]);
    const communities = ref([]);

    const fetchUserData = async () => {
        try {
            const userState = await axios.get('');

            email.value = userState.email;
            role.value = userState.role;
            username.value = userState.username;
        } catch (error) {
            console.error(error);
        }
    };

    const saveArticle = async (article) => {
        //Add to user state first
        bookmarks.value.push(article);
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

    return { email, role, username, journals, communities, fetchUserData };
});

export { authStore, userStore, featureStore };
