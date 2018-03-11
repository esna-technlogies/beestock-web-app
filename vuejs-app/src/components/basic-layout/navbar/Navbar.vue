<template>
  <nav class="-site-color navbar app-navbar navbar-expand-lg navbar-toggleable-md">
      <div class="-navbar-brand-container navbar-brand">
      <router-link :to="{ name: 'Home' }">
        <svg class="-beestock-navbar-logo navbar-brand">
          <text x="0" y="34" fill="#4ae387">BEESTOCK</text>
        </svg>
      </router-link>
    </div>

    <div class="row no-gutters navbar-container align-items-center justify-content-end">
      <div class="col-lg-6 col-md-6 col-sm-6 pl-5">
          <router-link
            :to="{ name: 'Photos' }"
            :active-class="'-nav-link-active'"
            class="-nav-link nav-link d-flex align-items-center justify-content ml-3" >
            {{ 'navLinks.photos' | translate }}
          </router-link>

          <router-link
            :to="{ name: 'Illustrations' }"
            :active-class="'-nav-link-active'"
            class="-nav-link nav-link d-flex align-items-center justify-content">
            {{ 'navLinks.illustrations' | translate }}
          </router-link>

          <router-link
            :to="{ name: 'Footage' }"
            :active-class="'-nav-link-active'"
            class="-nav-link nav-link d-flex align-items-center justify-content">
            {{ 'navLinks.footage' | translate }}
          </router-link>

          <router-link
            :to="{ name: 'Audio' }"
            :active-class="'-nav-link-active'"
            class="-nav-link nav-link d-flex align-items-center justify-content">
            {{ 'navLinks.audio' | translate }}
          </router-link>
      </div>

      <div class="col-4">
        <div class="row no-gutters justify-content-end" v-show="!isAuthenticatedUser">
          <div class="justify-content-center mr-3">
            <router-link
              :to="{ name: 'Login' }"
              class="-nav-link nav-link d-flex align-items-center justify-content-end m-0 p-0">
              {{ 'navLinks.login' | translate }}
            </router-link>
          </div>

          <div class="justify-content-center mr-3">
            <router-link
              :to="{ name: 'Register' }"
              class="-nav-link nav-link d-flex align-items-center justify-content-end m-0 p-0">
              {{ 'navLinks.register' | translate }}</span>
            </router-link>
          </div>
        </div>

        <div class="row no-gutters justify-content-end" v-show="isAuthenticatedUser">
          <div class="col-4 nav-item d-flex align-items-center justify-content-center">
            <div class="nav-link d-flex align-items-center justify-content-center m-0 mb-2 mt-3 p-0">
              <router-link :to="{ name: 'NewUpload' }" class="button btn-block btn-primary rounded-0 pl-3 pr-3">
                <span style="font-weight: bold;">{{ 'navLinks.upload' | translate }}</span>
                <span aria-hidden="true" class="fa fa-upload" style="font-size: 15px;"></span>
              </router-link>
            </div>
          </div>

          <div
            class="col-6 nav-item dropdown vuestic-navbar-dropdown d-flex align-items-end justify-content-end"
            v-dropdown>
            <a class="nav-link dropdown-toggle d-flex align-items-center justify-content">
              <span class="align-middle mr-2">{{ userDetails.firstName + ' ' + userDetails.lastName }}</span>
              <span class="avatar-container">
                <img src="https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png" />
              </span>
            </a>
            <div class="dropdown-menu last">
              <div class="dropdown-menu-content">
                <router-link :to="{ name: 'UserUploads' }" class="dropdown-item plain-link-item">
                  {{'user.uploads' | translate}}
                </router-link>
                <router-link :to="{ name: 'ProfileDetails' }" class="dropdown-item plain-link-item">
                  {{'user.settings' | translate}}
                </router-link>
                <div :to="{ name: 'Logout' }" class="dropdown-item plain-link-item" @click="doLogout">
                  {{'user.logout' | translate}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Dropdown from 'directives/Dropdown'

  import { routerHelper } from '../../../helpers'

  export default {
    name: 'navbar',

    directives: {
      dropdown: Dropdown
    },

    computed: {
      ...mapGetters([
        'isAuthenticatedUser',
        'userDetails'
      ])
    },
    methods: {
      doLogout () {
        if (!this.$store.getters.isAuthenticatedUser) { return this.$router.replace({ name: 'Home' }) }

        this.$store.dispatch('doLogout')

        routerHelper.logoutDone()
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";

  .navbar.app-navbar {
    .navbar-container {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    height: $top-nav-height;
    padding-left: $nav-padding-left;
    padding-right: $nav-padding-right;
    background-color: $top-nav-bg;

    .avatar-container {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      border: 2px solid $lighter-gray;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .menu-icon-container {
      padding: 0;
      font-size: $font-size-base;
    }

    .navbar-brand-container {
      position: absolute;
      z-index: 3;
      height: 100%;
      left: $navbar-brand-container-left;
      top: 0;
    }

    .nav-item {
      padding: 0;
      height: 100%;
    }

    .dropdown.vuestic-navbar-dropdown {
      .dropdown-toggle {
        padding: 0;
        &:after {
           display: none;
         }
      }

      &.show {
        @include media-breakpoint-up(lg) {
          .dropdown-menu {
            left: auto;
            right: 0;
          }
        }
        &:after {
           position: absolute;
           bottom: -$dropdown-show-b;
           right: calc(50% - 10px);
           width: 0;
           height: 0;
           display: block;
           content: '';
           border-left: 10px solid transparent;
           border-right: 10px solid transparent;
           border-bottom: 10px solid $darkest-gray;
         }
      }

      .dropdown-menu {
        margin-top: $dropdown-show-b;
        padding-top: 0;
        width: 100%;
      }


      .dropdown-item {
        height: $navbar-dd-item-height;
        cursor: pointer;
        font-size: $font-size-base;

        &:hover, &:active, &:focus, &.active {
          outline: none;
        }

        &.plain-link-item {
          color: $brand-primary;

          &:hover, &:active, &:focus {
            background: $dropdown-background;
          }

          .plain-link {
            text-decoration: none;
          }
        }
      }
    }

    .notify {
      position: relative;

      &::after {
         content: '';
         position: absolute;
         right: -6px;
         top: -6px;
         background-color: $brand-primary;
         height: 12px;
         width: 12px;
         border-radius: 50%;
       }
    }

    .i-nav-notification.notify::after {
      right: -4px;
      top: 0;
    }

    @include media-breakpoint-down(md) {
      height: $top-mobile-nav-height;
      padding: $nav-mobile-pt $nav-mobile-padding-h $nav-mobile-pb $nav-mobile-padding-h;

      .navbar-brand-container {
        width: $nav-mobile-brand-width;
        top: $nav-mobile-brand-top;
        left: $nav-mobile-brand-left;
        height: auto;
        .navbar-brand {
          height: $font-size-smaller;
          padding: 0;
          font-size: $font-size-smaller;
        }
      }

      .dropdown.vuestic-navbar-dropdown {
        &.show {
          display: flex;
          &:after {
            bottom: -$dropdown-mobile-show-b;
            z-index: 2;
          }
          .dropdown-menu {
            margin-top: $dropdown-mobile-show-b;
            left: auto;
            &.last {
              right: 0;
            }
          }
        }
      }
    }
  }

  /* Added By Developer */
  .-nav-link {
    padding: 0;
    margin: 0 5px;
    display: inline-block !important;
    font-size: .9rem;
    font-family: inherit;
    letter-spacing: 0.15rem;
  }

  .-nav-link:hover {
    color: #EBEBEB;
  }

  .-nav-link-active {
    color: #EBEBEB;
  }

   .-site-color {
    background-color: #254F99 !important;
  }

  .-active-navbar-link {
    color: #EBEBEB;
    text-decoration: underline;
  }

  .-navbar-brand-container {
    position: absolute;
    z-index: 3;
    height: 100%;
    left: 50px;
    top: 0;
  }
</style>
