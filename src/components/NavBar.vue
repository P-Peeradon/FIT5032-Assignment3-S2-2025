<template>
    <nav class="navbar container-fluid navbar-expand-lg mt-lg-0 ps-4 d-flex flex-row bg-primary">
        <div>
            <RouterLink to="/" class="navbar-brand ms-lg-2" href="#">Chillax Corner</RouterLink>
            <button class="navbar-toggler" type="button" @click="toggleNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div v-show="navShow" class="navbar-collapse" id="navigation">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <RouterLink to="/connect">
                            <a
                                href="#"
                                @mouseover="toggleConnect"
                                @mouseleave="toggleConnect"
                                role="button"
                                class="nav-link dropdown-toggle"
                                >Connect</a
                            >
                        </RouterLink>

                        <ul v-show="connectPillar" class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" to="/connect/community">
                                    Community
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a
                            href="#"
                            @click="toggleReflect"
                            role="button"
                            class="nav-link dropdown-toggle"
                            >Reflect</a
                        >
                        <ul v-show="reflectPillar" class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" to="/reflect/journal">
                                    Journal
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a
                            href="#"
                            @click="toggleGrow"
                            role="button"
                            class="nav-link dropdown-toggle"
                            >Grow</a
                        >
                        <ul v-show="growPillar" class="dropdown-menu">
                            <li>
                                <RouterLink class="drowdown-item" to="/grow/education">
                                    Mental Education
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const navShow = ref(false);
const connectPillar = ref(false);
const reflectPillar = ref(false);
const growPillar = ref(false);

const toggleNav = () => {
    navShow.value = !navShow.value;
    if (!navShow.value) {
        connectPillar.value = false;
        reflectPillar.value = false;
        growPillar.value = false;
    }
};

const toggleConnect = () => {
    connectPillar.value = !connectPillar.value;
};

const toggleReflect = () => {
    reflectPillar.value = !reflectPillar.value;
};

const toggleGrow = () => {
    growPillar.value = !growPillar.value;
};
</script>

<style></style>
