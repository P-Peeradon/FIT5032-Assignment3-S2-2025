import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '../firebase/init';
import onAuthStateChanged from 'firebase/auth';

export const userStore = defineStore('user', () => {
    const currentUser = ref(null);
    const userID = ref(null);
    const isAuthenticated = computed(() => {
        currentUser.value ? true : false;
    });

    onAuthStateChanged(auth);
});
