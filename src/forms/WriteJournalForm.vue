<template setup>
    <form @submit.prevent="writeJournal">
        <h2>what's on your mind</h2>
        <div class="row mt-2">
            <label for="topic" class="form-label">Topic</label>
            <input type="text" class="form-control" id="topic" v-model="topic" />
        </div>

        <div class="row mt-2">
            <label for="location" class="form-label">Location</label>
            <input type="text" class="form-control" id="location" v-model="location" />
        </div>

        <div class="mt-2 row-cols-3 g-3">
            <div class="col">
                <input type="checkbox" value="Anger" v-model="moods" />
                <label class="form-check-label" for="Anger">Anger</label>
            </div>

            <div class="col">
                <input type="checkbox" value="Happy" v-model="moods" />
                <label class="form-check-label" for="Anticipation">Happy</label>
            </div>

            <div class="col">
                <input type="checkbox" value="Joy" v-model="moods" />
                <label class="form-check-label" for="Joy">Joy</label>
            </div>

            <div class="col">
                <input type="checkbox" value="Cheerful" v-model="moods" />
                <label class="form-check-label" for="Cheerful">Cheerful</label>
            </div>

            <div class="col">
                <input type="checkbox" value="Fear" v-model="moods" />
                <label class="form-check-label" for="Fear">Fear</label>
            </div>

            <div class="col">
                <input type="checkbox" value="Surprise" v-model="moods" />
                <label class="form-check-label" for="Surprise">Surprise</label>
            </div>

            <div>
                <input type="checkbox" value="Sad" v-model="journalForm.moods" />
                <label class="form-check-label" for="Sad">Sad</label>
            </div>

            <div>
                <input type="checkbox" value="Disgust" v-model="moods" />
                <label class="form-check-label" for="Disgust">Disgust</label>
            </div>

            <div>
                <input type="checkbox" value="Bitter" v-model="moods" />
                <label class="form-check-label" for="Disgust">Bitter</label>
            </div>
        </div>

        <div class="row">
            <label for="content" class="form-label"></label>
            <textarea name="content" id="content" rows="4" v-model="content"></textarea>
        </div>

        <div class="row">
            <div class="btn-group d-flex flex-row justify-content-end">
                <button class="btn btn-secondary" @click="clearForm">Clear</button>
                <button type="submit" class="btn btn-primary">Write</button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { authStore } from '../stores/user';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['jot-down', 'clear']);

const authState = authStore();

const topic = ref('');
const location = ref('');
const moods = ref([]);
const content = ref('');

const writeJournal = () => {
    emit('jot-down', {});
};

const clearForm = () => {
    topic.value = '';
    location.value = '';
    moods.value = [];
    content.value = '';
};

onMounted(() => {
    authState.initAuth();
});
</script>

<style></style>
