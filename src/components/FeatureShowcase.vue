<template>
    <div class="card" id="feature">
        <router-link to="/">
            <img src="" alt="" class="card-img-top" />
            <div class="card-body">
                <h4 class="card-title">{{}}</h4>
                <p class="card-text">{{}}</p>
            </div>
        </router-link>
    </div>
</template>

<script setup>
const prop = defineProps({
    feature: {
        type: Object, // Please replace with class name, as we want to ensure that
        required: true,
    },
});
</script>

<style scoped>
#feature {
    width: 16rem;
    height: 10rem;
}
</style>
