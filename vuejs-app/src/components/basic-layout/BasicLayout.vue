<template>
  <div class="basic-layout">
    <navbar></navbar>
    <main id="content" class="content" role="main">
      <vuestic-alert type="warning" :class="'justify-content-center'" v-if="userIsAuthenticatedAndNotVerifiedYet">
          <span class="badge badge-pill badge-warning">
            {{'notificationsPage.alerts.warning' | translate}}
          </span>
        <span>
            Your account hasn't been verified yet, Please
            <router-link
              :to="{ name: 'VerifyUser' }"
              :style="'color: #225194 text-decoration: underline'">verify now</router-link>.
          </span>
      </vuestic-alert>

      <router-view v-show="!isLoading"></router-view>
    </main>

    <div class="-beestock-loading-wrapper text-center" v-if="isLoading">
      <img class="-beestock-loading" src="../../assets/images/beestock-loader.gif" alt="Beestock Loading">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Navbar from './navbar/Navbar'
  import Resize from 'directives/ResizeHandler'
  import BeestockFooter from '../beestock-footer/BeestockFooter'

  import auth from '../../services/auth'

  export default {
    name: 'basic-layout',
    components: {
      Navbar,
      BeestockFooter
    },
    directives: {
      resize: Resize
    },
    computed: {
      ...mapGetters([
        'sidebarOpened',
        'toggleWithoutAnimation',
        'isLoading'
      ]),
      classObject: function () {
        return {
          'sidebar-hidden': !this.toggleWithoutAnimation && !this.sidebarOpened,
          'sidebar-hidden sidebar-hidden_without-animation': this.toggleWithoutAnimation && !this.sidebarOpened
        }
      },
      breadcrumbs () {
        return this.$store.getters.breadcrumbs(this.$route.name)
      },
      userIsAuthenticatedAndNotVerifiedYet () {
        return auth.isAuthenticated() && !auth.isVerifiedUser()
      }
    }
  }
</script>

<style lang="scss">
  @import "../../sass/_variables.scss";
  @import "../../../node_modules/bootstrap/scss/mixins/breakpoints";
  @import "../../../node_modules/bootstrap/scss/functions";
  @import "../../../node_modules/bootstrap/scss/variables";

  .-basic-layout {
    padding-bottom: 215px;
  }

  .nothing {
    .content-wrap {
      margin-left: $content-wrap-ml;
    }

  }

  .content-wrap {
    padding: $content-wrap-pt $content-wrap-pr $content-wrap-pb 0;
    transition: margin-left 0.3s ease;

    .pre-loader {
      position: absolute;
      left: $vuestic-preloader-left;
      top: $vuestic-preloader-top;
    }

    .sidebar-hidden & {
      margin-left: $sidebar-left;
      height: 100%;
    }

    @include media-breakpoint-down(md) {
      padding: $content-mobile-wrap;
      margin-left: 0;

      .sidebar-hidden & {
        margin-left: 0;
      }
    }

    .content {
      position: relative;
    }
  }

  .content {
    padding: 0;
    padding-bottom: 215px;
  }

  .sidebar-hidden {
    height: 100%;
  }

  .-beestock-page-loading-wrapper {
    position: relative;
    height: calc(100% - #{$top-nav-height});
  }

  .-beestock-loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;

    .-beestock-loading {
      margin: auto;
      /*position: absolute;*/
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      max-width: 256px;
      max-height: 256px;
    }
  }
</style>
