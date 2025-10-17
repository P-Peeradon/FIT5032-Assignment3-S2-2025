<template>
    <form class="container-md" @submit.prevent="sendMail">
        <h2>Write Email to Chillax Corner Dev Team</h2>
        <div class="row mt-1">
            <div class="col-12">
                <span>From: </span
                ><input type="email" class="form-control" id="email" v-model="email" />
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12">
                <span>To: </span
                ><input
                    type="email"
                    class="form-control"
                    id="to"
                    readonly
                    aria-readonly="email"
                    v-model="to"
                />
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12">
                <span>Subject: </span
                ><input type="text" class="form-control" id="subject" v-model="subject" />
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12">
                <span>From: </span
                ><textarea
                    row="5"
                    type="text"
                    class="form-control"
                    id="text"
                    v-model="text"
                ></textarea>
            </div>
        </div>
        <button class="btn btn primary p-4 mt-3" type="submit">Send Email</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = ['send-email'];

const email = ref('');
const to = ref(process.env.VITE_SENDGRID_FROM_EMAIL);
const subject = ref('');
const text = ref('');

const sendMail = () => {
    emit('send-email', { email: email.value, subject: subject.value, text: text.value });
};
</script>

<style></style>
