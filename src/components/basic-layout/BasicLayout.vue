<template>
  <div :class="'sidebar-hidden sidebar-hidden_without-animation'">
    <navbar></navbar>
    <div class="content-wrap" id="content-wrap">
      <main id="content" class="content" role="main">
        <!--<vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>-->
        <vuestic-alert type="warning" :class="'justify-content-center'" v-if="userIsAuthenticatedAndNotVerifiedYet">
          <span class="badge badge-pill badge-warning">
            {{'notificationsPage.alerts.warning' | translate}}
          </span>
          <span>
            Your account hasn't been verified yet, Please
            <router-link
              :to="{ name: 'VerifyUser' }"
              :style="'color: #225194; text-decoration: underline'">verify now</router-link>.
          </span>
        </vuestic-alert>

        <vuestic-pre-loader v-show="isLoading" ref="preLoader" class="pre-loader"></vuestic-pre-loader>

        <router-view v-show="!isLoading"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Navbar from './navbar/Navbar'
  import Resize from 'directives/ResizeHandler'
  import AppAlert from '../app-alert/AppAlert'

  import auth from '../../services/auth';

  export default {
    name: 'basic-layout',
    components: {
      Navbar,
      AppAlert
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
        return auth.isAuthenticated() && !auth.isVerifiedUser();
      }
    }
  }
</script>

<style lang="scss">
  @import "../../sass/_variables.scss";
  @import "../../../node_modules/bootstrap/scss/mixins/breakpoints";
  @import "../../../node_modules/bootstrap/scss/functions";
  @import "../../../node_modules/bootstrap/scss/variables";

  .content-wrap {
    margin-left: $content-wrap-ml;
    padding: $content-wrap-pt $content-wrap-pr $content-wrap-pb 0;
    transition: margin-left 0.3s ease;

    .pre-loader {
      position: absolute;
      left: $vuestic-preloader-left;
      top: $vuestic-preloader-top;
    }

    .sidebar-hidden & {
      margin-left: $sidebar-left;
    }

    @include media-breakpoint-down(md) {
      padding: $content-mobile-wrap;
      margin-left: 0;

      .sidebar-hidden & {
        margin-left: 0;
      }
    }
  }
</style>
