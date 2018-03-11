<template>
  <div id="app" class="app">
    <basic-layout></basic-layout>
  </div>
</template>

<script>
  import BasicLayout from 'components/basic-layout/BasicLayout'
  import AuthLayout from './components/basic-layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'

  export default {
    name: 'app',
    metaInfo () {
      return {
        title: this.$t('titles.app'),
        titleTemplate: this.$t('titles.titleTemplate')
      }
    },
    components: {
      VuesticPreLoader,
      AuthLayout,
      BasicLayout
    }
  }
</script>

<style lang="scss">
  /*@import "../node_modules/vue-multiselect/dist/vue-multiselect.min";*/
  /*@import "../node_modules/buefy/lib/buefy.css";*/
  @import "sass/main";

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    height: 100%;
    background: url("../src/assets/images/bg.png") 0 0px no-repeat;
    background-size: 100%;

    .app {
      height: 100%;
    }
  }
</style>
