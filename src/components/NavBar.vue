<template>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Chillax Corner</a>
            <button class="navbar-toggler" type="button" @click="toggleNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div v-show="navShow" class="navbar-collapse" id="navigation">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a
                            href="#"
                            role="button"
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Connect
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="drowdown-item" to="/connect/society">
                                    Community
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="#" role="button" class="nav-link">Reflect</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" role="button" class="nav-link">Grow</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const navShow = ref(false)
const toggleNav = () => {
    navShow.value = !navShow.value
}
</script>

<style></style>
