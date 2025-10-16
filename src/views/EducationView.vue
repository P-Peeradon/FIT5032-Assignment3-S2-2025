<template>
    <div class="container-fluid">
        <h1 class="mt-2 h1 text-center text-primary">Education</h1>
        <div class="row">
            <main class="col-9 col-lg-8">
                <img src="../assets/grow/education.jpg" alt="education" />
                <h2 class="h2 text-secondary">
                    Why do youths need to learn mental health education?
                </h2>

                <ol>
                    <li>
                        <span class="fw-bolder text-success"
                            >Builds a foundation for lifelong health and resilience</span
                        >
                        <p class="fs-5">
                            Youth mental health foundation consists of healthy development,
                            emotional regulation and long-term issues prevention. Mental health
                            education makes youths express their own feelings appropriately and
                            freely, handle changes and stressful situations. Moreover, if they can
                            manage their own mental health, they can grow up into healthy adults.
                        </p>
                    </li>
                    <li>
                        <span class="fw-bolder text-success"
                            >Improves academic and social outcomes
                        </span>
                        <p class="fs-5">
                            Two main concerns of youths are academic and social aspects. Under good
                            mental health condition, they are more likely to have satisfying
                            academic result and healthy friend connections. Those contribute to
                            career success.
                        </p>
                    </li>
                    <li>
                        <span class="fw-bolder text-success"
                            >Prevents severe mental health disorders
                        </span>
                        <p class="fs-5">
                            Proactively monitoring mental health before age of 25 can prevent mental
                            health disorders to be emerges as crisis. Some youth health issues can
                            cause disability in the future, irreversable.
                        </p>
                    </li>
                    <li>
                        <span class="fw-bolder text-success">Impacts future generations</span>
                        <p class="fs-5">
                            Healthy mental health in youth can contribute to the development of
                            family members in their later life. Moreover, the good mental health
                            trends can inherit to the next generation.
                        </p>
                    </li>
                    <li>
                        <span class="fw-bolder text-success"
                            >Addresses a critical and growing global issue
                        </span>
                        <p class="fs-5">
                            As youths are the main demographic of many developed countries in the
                            world, including Singapore, Australia and New Zealand, improving their
                            mental health foster the country's economy, workforce and sociography.
                            Suiciding makes devastrating loss so be sure to stop that cycle.
                        </p>
                    </li>
                </ol>

                <div class="row">
                    <span class="">Cite:</span>
                    <ul class="list">
                        <li class="list-item">
                            <cite>
                                reasons, F. (2025). Five reasons why it’s a great time to study
                                youth mental health. Orygen.
                                [https://www.orygen.org.au/About/News-And-Events/2025/Five-reasons-why-it-s-a-great-time-to-study-youth]
                            </cite>
                        </li>
                        <li class="list-item">
                            <cite
                                >Black Dog Institute. (2020). Youth mental health. Black Dog
                                Institute.
                                [https://www.blackdoginstitute.org.au/research-areas/youth-mental-health/]</cite
                            >
                        </li>
                    </ul>
                </div>
            </main>
            <aside class="col-3 col-lg-4"></aside>
            <hr class="border border-primary border-2" />
            <div class="row">
                <form class="">
                    <label for="title">Search by Topic</label>
                    <input id="title" class="form-control" type="text" v-model="topic" />
                    <label for="institute">Search by Institute</label>
                    <input id="institute" class="form-control" type="text" v-model="institute" />
                </form>
            </div>

            <div class="row">
                <DataTable
                    v-if="fetchedArticles"
                    :value="displayedArticles"
                    paginator
                    :rows="5"
                    :rowsPerPageOptions="[5, 8, 10, 20]"
                    tableStyle="min-width: 56rem"
                >
                    <Column field="topic" sortable header="Topic"></Column>
                    <Column field="author" header="Author"></Column>
                    <Column field="institute" sortable header="Institute"></Column>
                    <Column field="code" header="Read">
                        <template #body="slotProps">
                            <button
                                class="btn btn-primary"
                                @click="readArticle(slotProps.data.code)"
                            >
                                Read
                            </button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Section, Article } from '../assets/article';

import { authStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();
const authState = authStore();

const fetchedArticles = ref([]);
const topic = ref('');
const institute = ref('');

const displayedArticles = computed(() => {
    return fetchedArticles.value.filter((article) => {
        let passesFilter = true; // Start by assuming the article passes

        // 1. Topic Filter (if active)
        if (topic.value !== '') {
            const topicMatch = article.topic.toLowerCase().includes(topic.value.toLowerCase());
            if (!topicMatch) {
                passesFilter = false;
            }
        }

        // 2. Institute Filter (if active)
        if (institute.value !== '') {
            const instituteMatch = article.institute
                .toLowerCase()
                .includes(institute.value.toLowerCase());
            if (!instituteMatch) {
                passesFilter = false;
            }
        }

        // The article is only included if it passed all checks
        return passesFilter;
    });
});

const readArticle = (articleCode) => {
    router.push({ name: 'article', params: { code: articleCode } });
};

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });

    const response = await axios.get('/grow/education');
    fetchedArticles.value = response.data.map(
        (article) => new Article({ sections: new Section(article.sections), ...article })
    );
});
</script>

<style></style>
