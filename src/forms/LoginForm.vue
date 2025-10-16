<template>
    <form class="container-fluid my-4 py-3 px-lg-5" @submit.prevent="login">
        <h2 class="mt-2">Login Form</h2>
        <div class="row mt-2">
            <div class="col-12">
                <label for="email" class="form-label">Label</label>
                <input type="email" id="email" class="form-control" v-model="email" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" />
            </div>
        </div>
        <div class="my-3 mt-3 d-flex flex-row justify-content-center gap-3">
            <button class="btn btn-primary" type="submit">Login</button>
            <button class="btn btn-info text-center" @click.prevent="triggerGoogle">
                Sign In with Google
            </button>
            <button class="btn btn-info">Forgot Password?</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['login', 'google-auth']);

const email = ref('');
const password = ref('');

const triggerGoogle = async () => {
    emit('google-auth', {
        role: 'User',
    });
};

const login = () => {
    emit('login', {
        email: email.value,
        password: password.value,
    });
};
</script>

<style scoped>
.container-fluid {
    width: 65%;
    background-color: beige;
}
</style>
