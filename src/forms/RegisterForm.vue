<template>
    <form class="container-md" @submit.prevent="">
        <div class="row-lg">
            <div class="col-12 col-lg-6">
                <label for="email" class="form-label"></label>
                <input type="email" class="form-control" id="email" v-model="email" required />
            </div>

            <div class="col-12 col-lg-6">
                <label for="username" class="form-label"></label>
                <input type="text" class="form-control" id="username" />
            </div>
        </div>
        <div class="row-lg">
            <div class="col-12 col-lg-6">
                <label for="password" class="form-label"></label>
                <input type="password" class="form-control" id="password" />
            </div>

            <div class="col-12 col-lg-6">
                <label for="confirmPassword" class="form-label"></label>
                <input type="password" class="form-control" id="confirmPassword" />
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>

<style></style>
