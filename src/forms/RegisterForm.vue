<template>
    <form class="container-fluid my-4 py-3 px-lg-5" @submit.prevent="register">
        <h2>Registration Form</h2>
        <div class="row mt-1">
            <div class="col-12 col-lg-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" />
            </div>

            <div class="col-12 col-lg-6">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" />
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 col-lg-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" />
            </div>

            <div class="col-12 col-lg-6">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="confirmPassword"
                />
            </div>
        </div>
        <div class="row mt-1">
            <label for="role" class="form-label">Role</label>
            <div class="col-12 form-check ms-3" id="role">
                <div>
                    <input
                        type="radio"
                        class="form-check-input"
                        id="user"
                        v-model="role"
                        value="user"
                        checked
                    />
                    <label for="user" class="form-check-label">User</label>
                </div>
                <div>
                    <input
                        type="radio"
                        class="form-check-input"
                        id="practitioner"
                        v-model="role"
                        value="practitioner"
                    />
                    <label for="practitioner" class="form-check-label">Practitioner</label>
                </div>
                <div>
                    <input
                        type="radio"
                        class="form-check-input"
                        id="social-worker"
                        v-model="role"
                        value="social worker"
                    />
                    <label for="social-worker" class="form-check-label">Social Worker</label>
                </div>
            </div>
        </div>
        <div class="my-3 d-flex flex-row justify-content-center gap-3">
            <button class="btn btn-primary" type="submit">Register</button>
            <button class="btn btn-info text-center" @click="triggerGoogle">
                Sign In with Google
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['register', 'google-auth']);

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref('user');

const register = () => {
    emit('register', {
        email: email.value,
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        role: role.value,
    });
};

const triggerGoogle = async () => {
    emit('google-auth', {
        role: role.value,
    });
};
</script>

<style scoped>
.container-fluid {
    width: 65%;
    background-color: beige;
}
</style>
