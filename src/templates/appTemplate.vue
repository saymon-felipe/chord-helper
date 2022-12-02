<template>
    <div class="container">
        <headerComponent></headerComponent>
        <slot />
        <footerComponent></footerComponent>
    </div>    
</template>
<script>
import headerComponent from "../components/headerComponent.vue";
import footerComponent from "../components/footerComponent.vue";

export default {
    name: "appTemplate",
    components: {
        headerComponent,
        footerComponent
    }
}
</script>
<style scoped>

</style>