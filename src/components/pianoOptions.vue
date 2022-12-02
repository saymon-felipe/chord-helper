<template>
    <div class="piano-options d-flex align-items-center">
        <button class="btn btn-primary d-flex align-items-center" v-on:click="startRecording()">
            <i class="fas fa-circle"></i>
            <span class="mx-2">Acordes</span>
        </button>
        <div class="feedback mx-4" v-if="recordVar">
            <span>Gravando...</span>
        </div>
        <div class="stop" v-if="recordVar" v-on:click="stopRecording()">
            <button class="btn btn-danger">Terminar</button>
        </div>
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "pianoOptions",
    mixins: [globalMethods],
    props: ["recordVar"],
    methods: {
        startRecording: function () {
            this.$emit("record");
        },
        stopRecording: function () {
            this.$emit("stopRecord");
        }
    }
}
</script>
<style scoped>

</style>