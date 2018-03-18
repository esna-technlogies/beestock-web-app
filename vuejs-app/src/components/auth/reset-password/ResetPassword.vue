<template>
  <div class="reset-password">
    <app-alert :alertType="alertType" :alertMessage="alertMessage"></app-alert>

    <div class="row no-gutters justify-content-center">
      <div class="col-7">
        <vuestic-widget :class="'-reset-password-widget'">

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
            <h5><strong>{{ 'forms.heads.resetPassword' | translate }}</strong></h5>
          </div>

          <div class="col-12">
            <hr class="mt-4 mb-2">
          </div>

          <form name="resetPassword" @submit.prevent="doResetPassword">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <fieldset>
                  <div class="form-group mb-2">
                    <div class="input-group">
                      <input
                        type="text"
                        id="-email-or-mobile-number"
                        :placeholder="'forms.labels.emailOrMobileNumber' | translate"
                        v-model="emailOrMobileNumber"
                        v-validate.initial="'required'"
                        data-vv-name="Email or Mobile Number"
                        required>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-lg-8 mt-3 mb-2">
                <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
                  {{ 'forms.buttons.submit' | translate }}
                </button>
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

import { routerHelper } from '../../../helpers'

export default {
    name: 'reset-password',
    metaInfo () {
      return {
        title: this.$t('titles.resetPassword')
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
        emailOrMobileNumber: '',
        isErrorAlert: false,
        errorAlertMessage: ''
      }
    },
    methods: {
      async doResetPassword () {
        this.startLoading()
        this.clearErrorAlert()

        try {
          await this.$store.dispatch('doResetPassword', this.emailOrMobileNumber)
          routerHelper.resetUserPasswordDone()
        } catch (error) {
          this.handleFailedPasswordReset(error)
        }

        this.stopLoading()
      },
      handleFailedPasswordReset (error) {
        if (!error.response) {
          this.setErrorAlert("Unknown error, please call the website's administrator")
        } else {
          this.setErrorAlert(error.response.data.error.message)
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
    }
  }
</script>

<style lang="scss" scoped>
  .-reset-password-widget {
    margin: 100px auto !important;
  }

  .-spinner {
    position: absolute;
    top: 120px;
    right: 40px;
  }
</style>
