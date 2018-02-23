<template>
  <div id="app" class="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <basic-layout v-else></basic-layout>
  </div>
</template>

<script>
  import BasicLayout from 'components/basic-layout/BasicLayout'
  import AuthLayout from './components/basic-layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      BasicLayout
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      }
    }
  }
</script>

<style lang="scss">
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
