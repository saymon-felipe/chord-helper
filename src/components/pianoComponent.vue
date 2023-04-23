<template>
    <div class="piano-cover">
        <div class="piano">
            <div class="key normal" id="C-1">
                <span class="label">C</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Cs-1">
                <span class="label">C#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="D-1">
                <span class="label">D</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Ds-1">
                <span class="label">D#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="E-1">
                <span class="label">E</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="F-1">
                <span class="label">F</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Fs-1">
                <span class="label">F#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="G-1">
                <span class="label">G</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Gs-1">
                <span class="label">G#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="A-1">
                <span class="label">A</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="As-1">
                <span class="label">A#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="B-1">
                <span class="label">B</span>
                <span class="key-after"></span>
            </div>

            <div class="key normal" id="C-2">
                <span class="label">C</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Cs-2">
                <span class="label">C#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="D-2">
                <span class="label">D</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Ds-2">
                <span class="label">D#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="E-2">
                <span class="label">E</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="F-2">
                <span class="label">F</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Fs-2">
                <span class="label">F#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="G-2">
                <span class="label">G</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="Gs-2">
                <span class="label">G#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="A-2">
                <span class="label">A</span>
                <span class="key-after"></span>
            </div>
            <div class="key semi" id="As-2">
                <span class="label">A#</span>
                <span class="key-after"></span>
            </div>
            <div class="key normal" id="B-2">
                <span class="label">B</span>
                <span class="key-after"></span>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "pianoComponent",
    mixins: [globalMethods],
    props: ["recordVar"],
    data() {
        return {
            recordedNotes: [],
            recorderChords: []
        }
    },
    watch: {
        recordVar: function () {
            if (this.recordVar) {
                this.recordNotes();
                return;
            }

            this.storeNotes();
            this.clearRecordNotes();
            return;
        }
    },
    methods: {
        storeNotes: function () {
            this.$emit("finishedRecording", this.recordedNotes);
        },
        clearRecordNotes: function () {
            $(".key").unbind("click");
            $(".key .key-after").hide();
            this.recordedNotes = [];
        },
        recordNotes: function () {
            let self = this;
            self.clearRecordNotes();
            $(".key").on("click", (event) => {
                let id = event.currentTarget.id;
                self.toggleNote(id);
            })
        },
        toggleNote: function (elementId) {
            let element = $("#" + elementId + " .key-after");
            if (element.is(":visible")) {
                this.unmarkNote(element, elementId);
            } else {
                this.markNote(element, elementId);
            }
        },
        markNote: function (element, id) {
            this.recordedNotes.push(id);
            element.show();
        },
        unmarkNote: function (element, id) {
            let self = this;
            let elementIndex = self.recordedNotes.indexOf(self.recordedNotes.find(obj => obj == id));
            self.recordedNotes.splice(elementIndex, 1);
            element.hide();
        },
        organizeSemiNotes: function () {
            let semiNotes = $(".semi");
            let first = true;
            semiNotes.each(function (index, item) {
                if (first) {
                    first = false;
                    return;
                }
                let positionX = 0;
                if (index == 2 || index == 5 || index == 7) {
                    positionX = 78;
                }
                let prevLeft = semiNotes[index - 1].offsetLeft;
                positionX += prevLeft + 79;
                item.style.left = positionX + "px";
            })
        },
        loadAudios: function () {
            let self = this;
            let elements = $(".key");
            elements.each(function (index, item) {
                let note = $(item).attr("id");
                self.createAudioElement(note);
            })
        },
        createAudioElement: function (note) {
            let noteId = note;
            if (note.indexOf("s") != -1) {
                noteId = note.replace("s", "#");
            }
            let element = $("<audio src='" + this.bucketUrl + encodeURIComponent(noteId) + ".mp3' id='audio-" + note + "'></audio>");
            $("body").append(element);
        },
        playNote: function (note) {
            let audioElement = $("#audio-" + note)[0];
            audioElement.pause();
            audioElement.currentTime = 0;
            audioElement.play();
        }
    },
    mounted: function () {
        let self = this;
        this.organizeSemiNotes();
        this.loadAudios();
        $(".key").on("mousedown", (event) => {
            self.playNote(event.currentTarget.id);
        })
    }
}
</script>
<style scoped>
.piano-cover {
    padding: 4rem 1rem;
    border-radius: 10px;
    background: var(--neutral-black-medium);
    width: fit-content;
    transform: scale(0.9);
}
.piano {
    width: 1100px;
    height: 300px;
    max-width: 1100px;
    margin: 0 auto;
    max-height: 300px;
    display: flex;
    position: relative;
    overflow: hidden;
}

.key-after {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--others-green);
    position: absolute;
    bottom: 40px;
    display: none;
  }

.key {
    height: 100%;
    cursor: pointer;
    border-radius: 0 0 5px 5px;
    font-weight: 600;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

 .key span {
    user-select: none;
 }

.normal {
    width: 80px;
    height: 100%;
    background: var(--neutral-white);
    border: 1px solid var(--neutral-gray-medium);
}

    .normal:hover {
        background: var(--neutral-gray-soft);
    }

    .normal:active {
        background: var(--neutral-gray-high);
    }

.semi {
    position: absolute;
    top: 0;
    left: 58px;
    height: 50%;
    width: 40px;
    z-index: 2;
    background: black;
    color: white;
}

    .semi:hover {
        background: var(--neutral-black-low);
    }

    .semi:active {
        background: var(--neutral-black-medium);
    }
</style>