<template>
  <div v-if="appReady" id="app">
    <router-view />
    <vue-snotify></vue-snotify>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      appReady: false,
    };
  },
  created() {
    this.$store.dispatch("fetchRemoteMessages").then(() => {
      this.appReady = true;
    });

    //
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
