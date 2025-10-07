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

const userStore = defineStore('user', () => {});

export { authStore, userStore };
