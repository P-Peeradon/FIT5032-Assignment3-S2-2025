<template>
    <div class="container-fluid">
        <h1 class="py-2">Education</h1>
        <div class="row">
            <main class="col-9 col-lg-8">
                <p>Why do youths need to learn mental health education?</p>

                <ol>
                    <li>
                        <span class="">Builds a foundation for lifelong health and resilience</span>
                        <p>
                            Youth mental health foundation consists of healthy development,
                            emotional regulation and long-term issues prevention. Mental health
                            education makes youths express their own feelings appropriately and
                            freely, handle changes and stressful situations. Moreover, if they can
                            manage their own mental health, they can grow up into healthy adults.
                        </p>
                    </li>
                    <li>
                        <span class="">Improves academic and social outcomes </span>
                        <p>
                            Two main concerns of youths are academic and social aspects. Under good
                            mental health condition, they are more likely to have satisfying
                            academic result and healthy friend connections. Those contribute to
                            career success.
                        </p>
                    </li>
                    <li>
                        <span class="">Prevents severe mental health disorders </span>
                        <p>
                            Proactively monitoring mental health before age of 25 can prevent mental
                            health disorders to be emerges as crisis. Some youth health issues can
                            cause disability in the future, irreversable.
                        </p>
                    </li>
                    <li>
                        <span class="">Impacts future generations</span>
                        <p>
                            Healthy mental health in youth can contribute to the development of
                            family members in their later life. Moreover, the good mental health
                            trends can inherit to the next generation.
                        </p>
                    </li>
                    <li>
                        <span class="">Addresses a critical and growing global issue </span>
                        <p>
                            As youths are the main demographic of many developed countries in the
                            world, including Singapore, Australia and New Zealand, improving their
                            mental health foster the country's economy, workforce and sociography.
                            Suiciding makes devastrating loss so be sure to stop that cycle.
                        </p>
                    </li>
                </ol>
                <p>
                    <span class="">Cite:</span>
                    <cite>
                        reasons, F. (2025). Five reasons why it’s a great time to study youth mental
                        health. Orygen.
                        [https://www.orygen.org.au/About/News-And-Events/2025/Five-reasons-why-it-s-a-great-time-to-study-youth]
                    </cite>
                    <cite
                        >Black Dog Institute. (2020). Youth mental health. Black Dog Institute.
                        [https://www.blackdoginstitute.org.au/research-areas/youth-mental-health/]</cite
                    >
                </p>
                <div class="row">
                    <DataTable
                        :value="articles"
                        paginator
                        :rows="5"
                        :rowsPerPageOptions="[5, 8, 10, 20]"
                        tableStyle="min-width: 56rem"
                    >
                        <Column class="col-3" field="topic" header="Topic"></Column>
                        <Column class="col-3" field="author" header="Author"></Column>
                        <Column class="col-4" field="institute" header="Institute"></Column>
                        <Column class="col-2"><button class="btn btn-primary">Read</button></Column>
                    </DataTable>
                </div>
            </main>
            <aside class="col-3 col-lg-4"></aside>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const articles = ref([]);
</script>

<style></style>
