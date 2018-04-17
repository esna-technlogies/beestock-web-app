<template>
  <nav class="navbar app-navbar navbar-toggleable-md -navbar">
    <div class="-navbar-brand-container d-flex align-items-center justify-content-start">
      <router-link class="" :to="{ path: '/' }">
        <span aria-hidden="true" class="fa fa-home align-middle mb-4 mr-2" style="font-size: 25px;"></span>

        <svg class="-beestock-navbar-logo navbar-brand">
          <text x="0" y="40" fill="#4ae387">BEESTOCK</text>
        </svg>
      </router-link>
    </div>

    <div class="row no-gutters navbar-container align-items-center justify-content-end">

      <div class="col-7 pl-5 text-primary">
          <a class="-nav-link nav-link d-flex align-items-center justify-content ml-3" href="#" @click.prevent="closeMenu">
            PHOTO
          </a>

          <a class="-nav-link nav-link d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
            ILLUSTRATION
          </a>

          <a class="-nav-link nav-link d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
            FOOTAGE
          </a>

          <a class="-nav-link nav-link d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
            AUDIO
          </a>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-3">
        <div class="row justify-content-end">
          <div class="col-1 nav-item d-flex align-items-center justify-content-center">
            <a class="nav-link d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
              <span aria-hidden="true" class="ellipsis entypo entypo-upload text-white" style="font-size: 25px;"></span>
            </a>
          </div>

          <div class="col-8 nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
            <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
              <span class="align-middle mr-2">Ahmed Shendy</span>
              <span class="avatar-container">
                <img src="https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png" />
              </span>
            </a>
            <div class="dropdown-menu last">
              <div class="dropdown-menu-content">
                <div class="dropdown-item plain-link-item">
                  <a class="plain-link" href="#">{{'user.profile' | translate}}</a>
                </div>
                <div class="dropdown-item plain-link-item">
                  <a class="plain-link" href="#" @click.prevent="showLanguageModal">{{'user.language' | translate}}</a>
                </div>
                <div class="dropdown-item plain-link-item">
                  <a class="plain-link" href="#">{{'user.logout' | translate}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col">-->
        <!--<a class="menu-icon i-menu-expanded" href="#" @click.prevent="toggleSidebar(false)" v-if="sidebarOpened"></a>-->
        <!--<a class="menu-icon i-menu-collapsed" href="#" @click.prevent="toggleSidebar(true)" v-else></a>-->
      <!--</div>-->

      <!--<div class="offset-lg-9"></div>-->
      <!--<div class="col nav-item d-flex align-items-center justify-content-center">-->
        <!--<a class="nav-link d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">-->
          <!--<span aria-hidden="true" class="ellipsis entypo entypo-upload text-white" style="font-size: 30px;"></span>-->
        <!--</a>-->
      <!--</div>-->

      <!--<div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
        <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
          <span class="i-nav-messages notify"></span>
        </a>
        <div class="dropdown-menu">
          <div class="dropdown-menu-content">
            <a class="dropdown-item" href="#">
              <span class="ellipsis">{{ $t('messages.new', {name: "Oleg M"})}}</span>
            </a>
            <a class="dropdown-item" href="#">
              <span class="ellipsis">{{ $t('messages.new', {name: "Andrei H"})}}</span>
            </a>
            <div class="dropdown-item plain-link-item">
              <a class="plain-link" href="#">{{'messages.all' | translate}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
        <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="#" @click.prevent="closeMenu">
          <span class="i-nav-notification notify"></span>
        </a>
        <div class="dropdown-menu">
          <div class="dropdown-menu-content">
            <a class="dropdown-item" href="#">
              <span class="ellipsis">{{$t('notifications.sentMessage', {name: 'Vasily S'})}}</span>
            </a>
            <a class="dropdown-item" href="#">
              <span class="ellipsis">{{$t('notifications.uploadedZip', { name: "Oleg M", type: "typography component"})}}</span>
            </a>
            <a class="dropdown-item" href="#">
              <span class="ellipsis">{{$t('notifications.startedTopic',{name: "Andrei H"}) }}</span>
            </a>
            <div class="dropdown-item plain-link-item">
              <a class="plain-link" href="#">{{'notifications.all' | translate}}</a>
            </div>
          </div>
        </div>
      </div>-->

    </div>
    <vuestic-modal ref="languageModal"
     v-bind:small="true" :okClass="'none'" :cancelClass="'none'">
      <div slot="title">{{'user.language' | translate}}</div>
      <div class="text-center">
              <button class="btn btn-info" @click="setLanguage('en')">
                {{'language.english' | translate}}
              </button>
              <hr>
              <button class="btn btn-info" @click="setLanguage('es')">
                {{'language.spanish' | translate}}
              </button>
      </div>
    </vuestic-modal>
  </nav>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import Dropdown from 'directives/Dropdown'

  export default {
    name: 'navbar',

    directives: {
      dropdown: Dropdown
    },

    computed: {
      ...mapGetters([
        'sidebarOpened',
        'toggleWithoutAnimation'
      ]),
      currentLanguage () {
        return Vue.i18n.locale() === 'en' ? 'English' : 'Spanish'
      }
    },
    methods: {
      ...mapActions([
        'closeMenu',
        'toggleSidebar',
        'isToggleWithoutAnimation'
      ]),
      showLanguageModal () {
        this.$refs.languageModal.open()
      },
      setLanguage (locale) {
        Vue.i18n.set(locale)
        this.$refs.languageModal.cancel()
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

    .dropdown.navbar-dropdown {
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

      .dropdown.navbar-dropdown {
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
    font-size: 1rem;
    font-family: inherit;
    letter-spacing: 0.15rem;
  }

  .-nav-link-hover:hover {
    color: #EBEBEB;
  }

  .-navbar {
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
