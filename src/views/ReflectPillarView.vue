<template>
    <div class="container-fluid">
        <h1 class="mt-2">REFLECT Pillar</h1>
        <q class="mt-3"
            >Young people should be at the forefront of global change and innovation. Empowered,
            they can be key agents for development and peace. If, however, they are left on
            society's margins, all of us will be impoverished<span>Kofi Annan (1938-2018)</span></q
        >
        <hr />

        <!-- All features contain in this application. -->
        <h2>Features for REFLECT</h2>

        <div v-if="reflectFeatures" class="d-flex flex-column flex-lg-row">
            <div v-for="feature in reflectFeatures" :key="feature.title">
                <FeatureShowcase :feature="feature" />
            </div>
        </div>
        <br />
    </div>
</template>

<script setup></script>

<style></style>
