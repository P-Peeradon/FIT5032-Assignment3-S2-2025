<template>
    <!-- This form is accessible only by social worker. -->
    <!-- We have method to check for unauthorised access. -->
    <form @submit.prevent="registerClub" class="container-fluid my-4 py-3 px-3 px-lg-5">
        <h2>Register new community</h2>
        <div class="row mt-2 g-3">
            <div class="col-6 col-lg-4">
                <label for="firstname" class="form-label">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    class="form-control"
                    v-model="firstname"
                    required
                />
            </div>
            <div class="col-6 col-lg-8">
                <label for="lastname" class="form-label">Last Name</label>
                <input type="text" id="lastname" class="form-control" v-model="lastname" required />
            </div>
        </div>
        <div class="row mt-2 g-3">
            <div class="col-6">
                <label for="name" class="form-label">Community Name</label>
                <input type="text" class="form-control" id="name" />
            </div>
            <div class="col-2">
                <label for="abbrev" class="form-label">Abbrevation</label>
                <input type="text" class="form-control" id="abbrev" v-model="abbrev" />
            </div>
            <div class="col-4">
                <label for="abbrev" class="form-label">Community Thumbnail</label>
                <input
                    type="file"
                    id="thumbnail"
                    ref="thumbnail"
                    @change="watchFile"
                    accept="image/*"
                />
            </div>
        </div>
    </form>
</template>

<script setup>
import { auth } from '../firebase/init';
import { ref } from 'vue';

const emit = defineEmits(['register-community']);

const firstname = ref('');
const lastname = ref('');
const name = ref('');
const abbrev = ref('');
const thumbnail = ref(null);

const watchFile = (event) => {
    const file = event.target.files[0];
    if (file) {
        thumbnail.value = file;
    } else {
        thumbnail.value = null;
    }
};

const registerClub = () => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail.value, thumbnail.value.name);

    emit('register-community', {
        firstname: firstname.value,
        lastname: lastname.value,
        name: name.value,
        abbrev: abbrev.value,
    });
};
</script>

<style scoped>
.container-fluid {
    width: 65%;
    background-color: beige;
}
</style>
