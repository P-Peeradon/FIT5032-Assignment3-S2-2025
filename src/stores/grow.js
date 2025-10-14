import { Article, Section } from '../assets/article';
import { db } from '../firebase/init';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const articleStore = defineStore('article', () => {
    const article = ref(null); // The interested Article
    const view = ref(0);

    const isLoading = ref(false);
    const isLoaded = computed(() => {
        return article.value !== null;
    });

    const loadArticle = async (code) => {
        isLoading.value = true;
        try {
            const articlesRef = collection(db, 'articles');
            const q = query(articlesRef, where('code', '==', code));
            const snapshot = await getDocs(q); // Should only return one document

            if (snapshot.docs.length > 0) {
                let data = snapshot.docs[0].data();
                const { sections, ...rest } = data;
                console.log(sections);

                article.value = new Article({
                    sections: sections.map((section) => new Section(section)),
                    ...rest,
                });
            }
        } catch (error) {
            console.error(`Error in fetching articles: ${error.message}`);
            article.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    const recordView = () => {
        view.value++;
    };

    return { article, view, isLoaded, loadArticle, recordView };
});

export { articleStore };
