<template>
  <div class="login">
    <app-alert :alertType="alertType" :alertMessage="alertMessage"></app-alert>

    <div class="row no-gutters justify-content-center">
      <div class="col-7">
        <vuestic-widget :class="'-login-widget'">

          <vuestic-alert type="danger" :withCloseBtn="true" v-show="isErrorAlert">
            <span class="badge badge-pill badge-danger">{{'notificationsPage.alerts.danger' | translate}}</span>
            {{ errorAlertMessage }}
            <i class="fa fa-close alert-close" @click="isErrorAlert=false"></i>
          </vuestic-alert>

          <spinner
            v-show="isLoading"
            :size="30"
            :line-size="4"
            :line-fg-color="'#F9CB55'"
            class="-spinner"/>

          <div class="col-12 text-center">
            <h4><strong>{{ 'forms.heads.signin' | translate }}</strong></h4>
          </div>

          <div class="col-12">
            <hr class="mt-4 mb-3">
          </div>

          <form name="login" @submit.prevent="doLogin">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <fieldset>
                  <div class="form-group mb-1">
                    <div class="input-group">
                      <input
                        id="-email-or-mobile-number"
                        type="text"
                        name="emailOrMobileNumber"
                        :placeholder="'forms.labels.email' | translate"
                        v-model="userName"
                        v-validate.initial="'required'"
                        data-vv-as="Email or Mobile Number"
                        required>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-lg-10">
                <fieldset>
                  <div class="form-group mb-1">
                    <div class="input-group">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        :placeholder="'forms.labels.password' | translate"
                        v-model="password"
                        v-validate.initial="'required'"
                        data-vv-as="Password"
                        required>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-lg-10 mt-3 mb-2">
                <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
                  {{ 'forms.buttons.signin' | translate }}
                </button>
              </div>

              <div class="col-lg-10 text-right">
                <router-link :to="{ name: 'ResetPassword' }">{{ 'forms.misc.forgetPassword' | translate }}</router-link>
              </div>

              <div class="col-lg-10 text-center mt-3">
                <span>
                  {{ 'forms.misc.donotHaveAccount' | translate }} <router-link :to="{ name: 'Register' }">{{ 'forms.misc.signUpHere' | translate }}</router-link>
                </span>
              </div>
            </div>
          </form>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import AppAlert from '../../app-alert/AppAlert'
  import Spinner from 'vue-simple-spinner'

export default {
    name: 'login',
    metaInfo () {
      return {
        title: this.$t('titles.login')
      }
    },
    props: {
      alertType: {
        type: String,
        default: ''
      },
      alertMessage: {
        type: String,
        default: ''
      }
    },
    components: {
      AppAlert,
      Spinner
    },
    data () {
      return {
        isLoading: false,
        userName: '',
        password: '',
        isErrorAlert: false,
        errorAlertMessage: '',
        showBadCredentialsAlert: false
      }
    },
    methods: {
      async doLogin () {
        if (!await this.$validator.validateAll()) return

        this.clearErrorAlert()
        this.startLoading()

        const queryParams = {
          userName: this.userName,
          password: this.password
        }

        try {
          await this.$store.dispatch('doLogin', queryParams)
          this.$router.push(this.sendTo)
        } catch (error) {
          this.handleFailedLogin(error)
        } finally {
          this.stopLoading()
        }
      },
      handleFailedLogin (error) {
        if (!error.response) {
          this.setErrorAlert(error.message)
        } else {
          this.setErrorAlert(error.response.data.message)
        }
      },
      startLoading () {
        this.isLoading = true
      },
      stopLoading () {
        this.isLoading = false
      },
      clearErrorAlert () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true
        this.errorAlertMessage = message
      }
    },
    computed: {
      sendTo () {
        const { prev, redirect } = this.$route.query
        if (redirect !== undefined) return { name: redirect }
        if (prev !== undefined) return { path: prev }

        return { name: 'Home' }
      }
    },
    created () {
      if (this.$store.getters.isAuthenticatedUser) {
        return this.$router.replace({
          name: this.sendTo.name,
          params: {
            alertType: this.alertType,
            alertMessage: this.alertMessage
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    /*width: 21.375rem;*/

    .down-container {
      margin-top: 3.125rem;
    }
  }

  .-login-widget {
    margin: 100px auto !important;
  }

  .-spinner {
    position: absolute;
    top: 125px;
    right: 40px;
  }
</style>
