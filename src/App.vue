<template>
  <div id="app">
    <router-view path="$router.key" />
  </div>
</template>

<script>
import './style/global.css';
import './assets/fontawesome/css/all.min.css';

export default {
  name: 'App'
}
</script>
