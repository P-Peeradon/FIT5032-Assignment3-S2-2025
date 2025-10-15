<template>
    <!-- This form is accessible only by social worker. -->
    <!-- We have method to check for unauthorised access. -->
    <form
        @submit.prevent="registerClub"
        class="container-md my-4 py-3 px-3 px-lg-5"
        style="background-color: beige"
    >
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
                <input type="text" class="form-control" id="name" required />
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
        <div class="row mt-2">
            <div class="col-6">
                <select id="location" placeholder="Location" v-model="location" class="form-select">
                    <option value="" default></option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="Sydney">Sydney</option>
                    <option value="Adelaide">Adelaide</option>
                    <option value="Auckland">Auckland</option>
                    <option value="Singapore">Singapore</option>
                </select>
            </div>
            <div class="col-6">
                <label for="organisation" class="form-label">Organisation</label>
                <input type="text" class="form-control" id="organisation" v-model="organisation" />
            </div>
        </div>
        <div class="row mt-2">
            <AddressForm :location="location" @send-address="updateAddress" />
        </div>
    </form>
</template>

<script setup>
import AddressForm from './AddressForm.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';
import { onMounted, ref } from 'vue';
import { authStore } from '../stores/user';

const emit = defineEmits(['register-community']);

const authState = authStore();

const firstname = ref('');
const lastname = ref('');
const name = ref('');
const abbrev = ref('');
const location = ref('');
const organisation = ref('');
const address = ref(null);
const thumbnail = ref(null);

const updateAddress = (payload) => {
    address.value = payload;
};

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
        location: location.value,
        organisation: organisation.value,
        address: address.value,
    });
};

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
});
</script>

<style scoped></style>
