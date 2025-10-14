<template>
    <div class="container-fluid">
        <h1>{{ displayArticle.topic }}</h1>
    </div>
</template>

<script setup>
import { Article, Section } from '../assets/article';
import { ref, onMounted, computed } from 'vue';

import { authStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-admin';
import { useRoute } from 'vue-router';

const route = useRoute();
const code = route.params.code;

const articles = ref([]);

const authState = authStore();

const displayArticle = computed(() => {
    return articles.value.find((article) => article.code === code);
});

const fetchAllArticles = async () => {
    const articlesRef = collection(db, 'articles');
    const snapshot = await getDocs(articlesRef);
    const articles = [];

    snapshot.forEach((d) => {
        let data = d.data();

        articles.push(
            new Article({
                sections: new Section(data.sections),
                ...data,
            })
        );
    });

    fetchedArticles.value = articles;
};

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        authState.initAuth();
    });
    await fetchAllArticles();
});
</script>

<style></style>
