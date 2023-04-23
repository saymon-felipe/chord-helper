<template>
    <appTemplate>
        <section class="content d-flex flex-column justify-content-start">
            <pianoOptions @record="recording = true" @stopRecord="recording = false" :recordVar="recording" :storedNotes="storedNotes" />
            <pianoComponent :recordVar="recording" @finishedRecording="fillStoredNotes($event)" />
        </section>
    </appTemplate>
</template>
<script>
import appTemplate from "../templates/appTemplate.vue";
import pianoComponent from "../components/pianoComponent.vue";
import pianoOptions from "../components/pianoOptions.vue";
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "home",
    mixins: [globalMethods],
    data() {
        return {
            recording: false,
            storedNotes: []
        }
    },
    methods: {
        fillStoredNotes: function (event) {
            this.storedNotes = event;
        }
    },
    components: {
        appTemplate,
        pianoComponent,
        pianoOptions
    }
}
</script>
<style scoped>
.content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>