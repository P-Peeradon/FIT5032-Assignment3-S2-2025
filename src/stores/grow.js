import { db } from '../firebase/init';
import { Article } from '../assets/article';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, getDocs } from 'firebase/firestore';

export const articleStore = defineStore('article', () => {
    const articles = ref([]); // All articles registered in the system.
    const displayedArticle = computed((code) => {
        return articles.value.find((article) => article.getCode() === code);
    });

    const fetchAllArticle = async () => {
        const articlesRef = collection(db, 'articles');

        const snapshot = await getDocs(articlesRef);

        snapshot.forEach((d) => {
            articles.value.push(new Article(d.data()));
        });
    };

    return { articles, displayedArticle, fetchAllArticle };
});
