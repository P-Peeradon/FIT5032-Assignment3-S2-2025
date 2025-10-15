import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/init';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import ConnectPillarView from '../views/ConnectPillarView.vue';
import CommunityView from '../views/CommunityView.vue';
import JournalView from '../views/JournalView.vue';
import EducationView from '../views/EducationView.vue';
import ReflectPillarView from '../views/ReflectPillarView.vue';
import GrowPillarView from '../views/GrowPillarView.vue';
import ArticleView from '../views/ArticleView.vue';
import CommunityDataView from '../views/CommunityDataView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/connect',
            name: 'connect',
            component: ConnectPillarView,
        },
        {
            path: '/connect/community',
            name: 'community',
            component: CommunityView,
            meta: { requiresAuth: true },
        },
        {
            path: '/connect/community/:cid',
            name: 'communityData',
            component: CommunityDataView,
            params: true,
            meta: { requiresAuth: true },
        },
        {
            path: '/connect/community/register',
            name: 'community',
            component: CommunityView,
            meta: { requiresAuth: true },
        },
        {
            path: '/reflect',
            name: 'reflect',
            component: ReflectPillarView,
        },
        {
            path: '/reflect/journal',
            name: 'journal',
            component: JournalView,
            meta: { requiresAuth: true },
        },

        {
            path: '/grow',
            name: 'grow',
            component: GrowPillarView,
        },
        {
            path: '/grow/education',
            name: 'education',
            component: EducationView,
            meta: { requiresAuth: true },
        },
        {
            path: '/grow/article/:code',
            name: 'article',
            component: ArticleView,
            params: true,
            meta: { requiresAuth: true },
        },
    ],
});

export default router;
