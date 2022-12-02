<template>
    <appTemplate>
        <section class="content d-flex flex-column">
            <pianoOptions @record="recording = true" @stopRecord="recording = false" :recordVar="recording" />
            <pianoComponent :recordVar="recording" />
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
            recording: false
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
    height: calc(100% - 250px);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>