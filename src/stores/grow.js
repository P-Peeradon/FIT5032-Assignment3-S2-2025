import { db } from '../firebase/init';
import { Article } from '../assets/article';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, getDocs } from 'firebase/firestore';

export const articleStore = defineStore('article', () => {
    const article = ref(new Article()); // The interested Article
    const view = ref(0);

    return { article, view };
});
