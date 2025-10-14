<template>
    <div class="container-fluid">
        <div class="row mt-2">
            <h1 class="py-2">Journal</h1>
        </div>

        <main class="mt-3">
            <h2>5 Benefits of Writing Journal</h2>

            <blockquote>
                "Journaling offers numerous benefits for mental health, especially stress reduction,
                emotional regulation and self-awareness. Your journal is your safe space without
                relying on anyone else." (Sutton, 2018)<br />
            </blockquote>

            <ol>
                <li>
                    <span class="">Stress Reduction and Emotional Processing</span>
                    <p>Journaling helps you understand what you are worrying about.</p>
                </li>
                <li>
                    <span class="">Enhanced Self-Awareness and Insight</span>
                    <p>The act of writing induces self-reflection and deepen mood understanding.</p>
                </li>
                <li>
                    <span class="">Improved Mood and Mental Well-being</span>
                    <p>
                        By acknowledging happy and sorrow memories, journaling can help boosting
                        happiness and avoiding sadness.
                    </p>
                </li>
                <li>
                    <span class="">Increased Resilience and Coping Skills</span>
                    <p>
                        Jotting down past events understand how you deal with each events and how
                        you learn from that incidents.
                    </p>
                </li>
                <li>
                    <span class="">Relaxation</span>
                    <p>
                        After writing down your worries, you can still read your journals anytime
                        and understand that feelings. You will feel secure but realise of what
                        happened with you.
                    </p>
                </li>
            </ol>
            <p>
                <span class="">Cite:</span>
                <cite>
                    Sutton, J. (2018, May 14). 5 Benefits of Journaling for Mental Health. Positive
                    Psychology. [https://positivepsychology.com/benefits-of-journaling/]
                </cite>
            </p>
        </main>
        <aside><WriteJournalForm @jot-down="writeJournal" /></aside>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import WriteJournalForm from '../forms/WriteJournalForm.vue';
import { authStore, userStore } from '../stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/init';

const authState = authStore();
const userState = userStore();

const writeJournal = () => {};

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
});
</script>

<style></style>
