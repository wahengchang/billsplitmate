<template>
  <v-app>
    <v-main>
      <v-container class="app-container" max-width="800">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  margin: 0 auto;
  padding: 16px;
}
</style>
