<template>
    <form @submit.prevent="" class="container-lg px-4">
        <div class="row mt-2">
            <div class="col-2">
                <label for="no" class="form-label"></label>
                <input type="text" id="no" class="form-control" required />
            </div>
            <div class="col-5 col-lg-4">
                <label for="building" class="form-label fs-4">Building name</label>
                <input type="text" id="building" class="form-control" />
            </div>
            <div class="col-2">
                <label for="street" class="form-label fs-4">Street</label>
                <input type="text" class="form-control" id="street" v-model="street" required />
            </div>
            <div class="col-1">
                <label for="floor" class="form-label fs-4">Floor</label>
                <input type="text" class="form-control" id="floor" v-model="floor" />
            </div>
            <div class="col-2 col-lg-3">
                <label for="unit" class="form-label fs-4">Unit</label>
                <input type="text" id="unit" class="form-control" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-6">
                <label for="suburb" class="form-label fs-4">Suburb</label>
                <input type="text" id="suburb" class="form-control" required />
            </div>
            <div class="col-3">
                <label for="state" class="form-label fs-4">State</label>
            </div>
            <div class="col-4">
                <label for="" class="form-label fs-4">Postcode</label>
            </div>
        </div>
    </form>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
    location: {
        type: String,
        required: true,
    },
});

const emit = defineEmits('send-address');

const floor = ref(0);
const unit = ref(0);

watch();
</script>

<style></style>
