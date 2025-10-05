<template>
    <form class="container-md" @submit.prevent="">
        <div class="row-lg">
            <div class="col-12 col-lg-6">
                <label for="email" class="form-label"></label>
                <input type="email" class="form-control" id="email" v-model="email" required />
            </div>

            <div class="col-12 col-lg-6">
                <label for="username" class="form-label"></label>
                <input type="text" class="form-control" id="username" v-model="username" />
            </div>
        </div>
        <div class="row-lg">
            <div class="col-12 col-lg-6">
                <label for="password" class="form-label"></label>
                <input type="password" class="form-control" id="password" v-model="password" />
            </div>

            <div class="col-12 col-lg-6">
                <label for="confirmPassword" class="form-label"></label>
                <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="confirmPassword"
                />
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['register']);

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const register = () => {
    emit('register', {
        email: email.value,
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    });
};
</script>

<style></style>
