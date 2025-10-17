<template>
    <div class="container-fluid">
        <h1 class="mt-2 py-3 h1 text-center text-primary">Journal</h1>

        <figure class="text-center">
            <blockquote class="blockquote mx-4 px-4">
                <q class="mt-3"
                    >Watch your thoughts, for they will become actions. Watch your actions, for
                    they'll become habits. Watch your habits for they will forge your character.
                    Watch your character, for it will make your destiny</q
                >
            </blockquote>

            <figcaption class="blockquote-footer">
                <span>Margaret Thatcher (1925-2013)</span>
            </figcaption>
        </figure>

        <hr class="border border-primary border-2" />

        <main class="mt-3">
            <h2 class="my-3 h2 text-secondary">5 Benefits of Writing Journal</h2>

            <ol>
                <li>
                    <span class="fw-bolder text-success"
                        >Stress Reduction and Emotional Processing</span
                    >
                    <p>Journaling helps you understand what you are worrying about.</p>
                </li>
                <li>
                    <span class="fw-bolder text-success">Enhanced Self-Awareness and Insight</span>
                    <p>The act of writing induces self-reflection and deepen mood understanding.</p>
                </li>
                <li>
                    <span class="fw-bolder text-success">Improved Mood and Mental Well-being</span>
                    <p>
                        By acknowledging happy and sorrow memories, journaling can help boosting
                        happiness and avoiding sadness.
                    </p>
                </li>
                <li>
                    <span class="fw-bolder text-success"
                        >Increased Resilience and Coping Skills</span
                    >
                    <p>
                        Jotting down past events understand how you deal with each events and how
                        you learn from that incidents.
                    </p>
                </li>
                <li>
                    <span class="fw-bolder text-success">Relaxation</span>
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

const writeJournal = () => {
    await;
};

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        await authState.initAuth();
    });
});
</script>

<style></style>
