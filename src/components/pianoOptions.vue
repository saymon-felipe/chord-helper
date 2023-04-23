<template>
    <div class="piano-options-container">
        <div class="piano-options d-flex align-items-center justify-content-center">
            <button class="btn btn-primary d-flex align-items-center" v-on:click="startRecording()">
                <i class="fas fa-circle"></i>
                <span class="mx-2">Acordes</span>
            </button>
            <button class="btn btn-danger d-flex align-items-center mx-2" v-on:click="clearStoredChords()" v-if="storedChords.length > 0">
                <i class="fas fa-trash"></i>
                <span class="mx-2">Limpar tudo</span>
            </button>
            <div class="feedback mx-4" v-if="recordVar">
                <span>Gravando...</span>
            </div>
            <div class="stop" v-if="recordVar" v-on:click="stopRecording()">
                <button class="btn btn-danger">Terminar</button>
            </div>
        </div>
        <div class="chords-container-external" v-if="showChordsContainer">
            <div class="chords-container d-flex align-items-center justify-content-center my-2" v-for="(chord, index) in storedChords" v-bind:key="index">
                <div class="delete-chord" v-on:click="deleteChord(index)">
                    <i class="fas fa-times"></i>
                </div>
                <span>Acorde gravado: </span>
                <div class="chord-space">
                    {{ chord.name }}
                </div>
                <div class="play-button" v-on:click="playStoredChord(index)">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";
import $ from 'jquery';

export default {
    name: "pianoOptions",
    mixins: [globalMethods],
    props: ["recordVar", "storedNotes"],
    data() {
        return {
            showChordsContainer: false,
            storedChords: [],
            storedChordNotes: [],
            allAvailableChords: {
                "C": {
                    0: ["C-1", "E-1", "G-1"],
                    1: ["C-2", "E-2", "G-2"],
                    2: ["C-2", "E-2", "G-1"]
                },
                "Cm": {
                    0: ["C-1", "Ds-1", "G-1"],
                    1: ["C-2", "Ds-2", "G-2"]
                },
                "C#": {
                    0: ["Cs-1", "F-1", "Gs-1"],
                    1: ["Cs-2", "F-2", "Gs-2"]
                },
                "C#m": {
                    0: ["Cs-1", "E-1", "Gs-1"],
                    1: ["Cs-2", "E-2", "Gs-2"]
                },
                "D": {
                    0: ["D-1", "Fs-1", "A-1"],
                    1: ["D-2", "Fs-2", "A-2"]
                },
                "Dm": {
                    0: ["D-1", "F-1", "A-1"],
                    1: ["D-2", "F-2", "A-2"]
                },
                "D#": {
                    0: ["Ds-1", "G-1", "As-1"],
                    1: ["Ds-2", "G-2", "As-2"]
                },
                "D#m": {
                    0: ["Ds-1", "Fs-1", "As-1"],
                    1: ["Ds-2", "Fs-2", "As-2"]
                },
                "E": {
                    0: ["E-1", "Gs-1", "B-1"],
                    1: ["E-2", "Gs-2", "B-2"]
                },
                "Em": {
                    0: ["E-1", "G-1", "B-1"],
                    1: ["E-2", "G-2", "B-2"]
                },
                "F": {
                    0: ["F-1", "A-1", "C-2"]
                },
                "Fm": {
                    0: ["F-1", "Gs-1", "C-2"]
                },
                "F#": {
                    0: ["Fs-1", "As-1", "Cs-2"]
                },
                "F#m": {
                    0: ["Fs-1", "A-1", "Cs-2"]
                },
                "G": {
                    0: ["G-1", "B-1", "D-2"]
                },
                "Gm": {
                    0: ["G-1", "As-1", "D-2"]
                },
                "G#": {
                    0: ["Gs-1", "C-2", "Ds-2"]
                },
                "G#m": {
                    0: ["Gs-1", "B-1", "Ds-2"]
                },
                "A": {
                    0: ["A-1", "Cs-2", "E-2"]
                },
                "Am": {
                    0: ["A-1", "C-2", "E-2"]
                },
                "A#": {
                    0: ["As-1", "D-2", "F-2"]
                },
                "A#m": {
                    0: ["As-1", "Cs-2", "F-2"]
                },
                "B": {
                    0: ["B-1", "Ds-2", "Fs-2"]
                },
                "Bm": {
                    0: ["B-1", "D-2", "Fs-2"]
                }
            }
        }
    },
    watch: {    
        storedNotes: function () {
            this.chooseChord();
        },
        storedChords: function () {
            if (this.storedChords.length > 0) {
                this.showChordsContainer = true;
            } else {
                this.showChordsContainer = false;
            }
        }
    },
    methods: {
        deleteChord: function (index) {
            this.storedChords.splice(index, 1);
        },
        clearStoredChords: function () {
            this.storedChords = [];
        },
        playStoredChord: function (index) {
            let element1 = "#audio-" + this.storedChords[index].chordNotes[0];
            let element2 = "#audio-" + this.storedChords[index].chordNotes[1];
            let element3 = "#audio-" + this.storedChords[index].chordNotes[2];
            let audioElements = $(element1 + ", " + element2 + ", " + element3);
            for (let i = 0; i < audioElements.length; i++) {
                let currentAudioElement = $(audioElements[i])[0];
                let currentKeyElement = $("#" + currentAudioElement.getAttribute("id").replace("audio-", ""));
                
                if (currentKeyElement.hasClass("auto-play-select-key-white") || currentKeyElement.hasClass("auto-play-select-key-black")) {
                    currentKeyElement.removeClass("auto-play-select-key-white");
                    currentKeyElement.removeClass("auto-play-select-key-black");
                }
                setTimeout(() => {
                    if (currentKeyElement.hasClass("semi")) {
                        currentKeyElement.addClass("auto-play-select-key-black");
                    } else if (currentKeyElement.hasClass("normal")){
                        currentKeyElement.addClass("auto-play-select-key-white");
                    }
                }, 10)
                currentAudioElement.pause();
                currentAudioElement.currentTime = 0;
                currentAudioElement.play();
            }
        },
        startRecording: function () {
            this.$emit("record");
        },
        stopRecording: function () {
            this.$emit("stopRecord");
        },
        chooseChord: function () {
            let chord = "";
            for (const [currentChord, currentChordObj] of Object.entries(this.allAvailableChords)) {
                for (let i = 0; i < Object.keys(currentChordObj).length; i++) {
                    let equalArrays = this.storedNotes.length === currentChordObj[i].length && this.storedNotes.every((element, index) => {
                        return element === currentChordObj[i][index];
                    });

                    if (equalArrays) {
                        chord = {
                            name: currentChord,
                            chordNotes: this.storedNotes
                        }
                    }
                }

                if (currentChord == "") {
                    continue;
                }
            }

            const objectExists = this.storedChords.some(obj => 
                obj.name === chord.name
            );
            
            if (chord != "" && !objectExists) {
                this.storedChords.push(chord);
            }
        }
    }
}
</script>
<style scoped>
.chord-space {
    border: 2px solid var(--others-yellow);
    border-radius: 7px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 7px;
    font-weight: bold;
}

.play-button, .delete-chord {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 7px;
    cursor: pointer;
    border-radius: 7px;
}

    .play-button:hover {
        background: var(--neutral-gray-high-2);
    }

.delete-chord {
    color: var(--others-red);
}

    .delete-chord:hover {
        background: var(--others-red-high);
    }
</style>