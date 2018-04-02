<template>
  <div id="app" class="app">
    <div class="content">
      <navbar></navbar>

      <main class="content-inside" role="main">
        <not-verified-alert v-if="userIsAuthenticatedAndNotVerifiedYet"/>

        <router-view />
      </main>

      <!--<page-pre-loader v-if="isPageLoading"/>-->
    </div>

    <beestock-footer />
  </div>
</template>

<script>
  import BasicLayout from 'components/basic-layout/BasicLayout'
  import AuthLayout from './components/basic-layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  import BeestockFooter from './components/beestock-footer/BeestockFooter'
  import NotVerifiedAlert from './components/alerts/NotVerifiedAlert'
  import PagePreLoader from './components/loaders/PagePreLoader'
  import Navbar from './components/basic-layout/navbar/Navbar'

  import auth from './services/auth'

  import {mapGetters} from 'vuex'



  export default {
    name: 'app',
    metaInfo () {
      return {
        title: this.$t('titles.app'),
        titleTemplate: this.$t('titles.titleTemplate')
      }
    },
    components: {
      Navbar,
      AuthLayout,
      BasicLayout,
      PagePreLoader,
      BeestockFooter,
      VuesticPreLoader,
      NotVerifiedAlert
    },
    computed: {
      ...mapGetters(['isPageLoading']),
      userIsAuthenticatedAndNotVerifiedYet () {
        return auth.isAuthenticated() && !auth.isVerifiedUser()
      }
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

  html, body {
    height: 100%;
  }

  body {
    background: url("../src/assets/images/bg.png") 0 0px no-repeat;
    background-size: 100%;

    .app {
      display: flex;
      flex-direction: column;
      height: 100vh;

      .content {
        flex: 1 0 auto;

        .content-inside {
          padding: $content-wrap-pt $content-wrap-pr $content-wrap-pb $content-wrap-pl;
        }
      }
    }
  }

  .-transparent-widget {
    background: rgba(255, 255, 255, 0.95)
  }
</style>
