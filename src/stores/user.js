import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { auth, db } from '../firebase/init';
import { Feature } from '../assets/feature';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';

const authStore = defineStore('auth', () => {
    const currentUser = ref(null);
    const authLoad = ref(false);
    const userID = computed(() => {
        return currentUser.value ? currentUser.value.uid : null;
    });
    const isAuthenticated = computed(() => {
        return currentUser.value ? true : false;
    });

    const googleAuth = new GoogleAuthProvider();

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

    async function signInWithGoogle(role) {
        try {
            // Run by using Google Auth
            const googleCredential = await signInWithPopup(auth, googleAuth);
            analytics.logEvent('login_started');

            // Special case, can access user data in Firestore to check whether that uid exists or not.
            const userRef = doc(collection(db, 'users'), googleCredential.user.uid);
            if (!userRef) {
                axios.post('https://recorduser-qbseni5s5q-uc.a.run.app', {
                    email: googleCredential.user.email,
                    username: googleCredential.user.displayName,
                    role: role,
                });
            }

            return googleCredential.user.displayName;
        } catch (error) {
            console.error(`Error in Google Sign in: ${error.message}`);
        }
    }

    return { currentUser, userID, isAuthenticated, initAuth, signInWithGoogle };
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

    async function fetchFeatures() {
        try {
            const response = await axios.get('https://getallfeatures-qbseni5s5q-uc.a.run.app');
            features.value = response.data.map((feature) => new Feature(feature));
        } catch (error) {
            console.error(`${error.code}: Error in fetching features: ${error.message}`);
        }
    }

    return { connectFeatures, reflectFeatures, growFeatures, fetchFeatures };
});

const userStore = defineStore('user', () => {
    const uid = auth.currentUser ? auth.currentUser.uid : null;
    const email = ref('');
    const role = ref('');
    const username = ref('');
    const journals = ref([]);
    const bookmarks = ref([]);
    const communities = ref([]);

    async function fetchUserData() {
        try {
            const userData = await axios.get('');

            email.value = userData.email;
            role.value = userData.role;
            username.value = userData.username;
        } catch (error) {
            console.error(error);
        }
    }

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
