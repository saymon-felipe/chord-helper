<template>
    <footer class="w-100 d-flex justify-content-center py-4">
        <div class="text-center">
            <p>Copyright © {{ year }} - Chord helper</p>
            <span>By Rabsystems</span>
        </div>
    </footer>    
</template>
<script>
export default {
    name: "footerComponent",
    data() {
        return {
            year: null
        }
    },
    methods: {
        fillYear: function () {
            this.year = new Date().getFullYear();
        }
    },
    mounted: function () {
        this.fillYear();
    }
}
</script>
<style scoped>
</style>