<template>
    <h1 class="mt-2 h1 text-center text-primary">Article</h1>
    <div v-if="articleState.isLoaded" class="container-fluid">
        <article>
            <h2 class="mt-2 h2 text-secondary">{{ articleState.article.topic }}</h2>
            <p class="text-success px-5 mt-4 fs-4">{{ articleState.article.purpose }}</p>
            <div class="mt-2" v-for="section in articleState.article.sections" :key="section">
                <section>
                    <h3 class="mt-3 h3 text-info">{{ section.subtitle }}</h3>
                    <br v-if="section.subtitle !== ''" />
                    <div v-for="paragraph in section.paragraphs" :key="paragraph">
                        <p class="fs-5 indent">{{ paragraph }}</p>
                    </div>
                </section>
            </div>
        </article>
        <div class="my-4 d-flex flex-row justify-content-center">
            <button class="btn btn-info" @click="educationReturn">To Education</button>
        </div>
    </div>

    <div v-else>Currently loading article...</div>
</template>

<script setup>
import { onMounted } from 'vue';

import { authStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';
import { useRoute, useRouter } from 'vue-router';
import { articleStore } from '../stores/grow';

const route = useRoute();
const router = useRouter();
const code = route.params.code;

const authState = authStore();
const articleState = articleStore();

const educationReturn = () => {
    router.push({ name: 'education' });
};

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
    await articleState.loadArticle(code);
});
</script>

<style scope>
.indent {
    text-indent: 3rem; /* Indent the first line by 2em */
}
</style>
