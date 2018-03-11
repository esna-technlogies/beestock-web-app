<template>
  <div class="verify-user">
    <div class="row no-gutters justify-content-center">
      <div class="col-10 col-sm-10 col-md-8 col-lg-6">
        <vuestic-widget :class="'-verify-user-widget'">
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
            <h5><strong>{{ 'forms.heads.verifyUser' | translate }}</strong></h5>
          </div>

          <div class="col-12">
            <hr class="mt-4 mb-3">
          </div>

          <form name="verifyUser" @submit.prevent="doVerifyUser">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <fieldset>
                  <div class="form-group mb-1">
                    <div class="input-group">
                      <input
                        type="text"
                        id="-verification-code"
                        name="verificationCode"
                        v-validate="'required'"
                        v-model="verificationCode"
                        data-vv-as="Verification Code"
                        :placeholder="'forms.labels.verificationCode' | translate"
                        required>
                      <!--<label class="control-label" for="-verification-code">
                        {{ 'forms.labels.verificationCode' | translate }}</label><i class="bar"></i>-->
                      <i class="bar"></i>
                      <small v-show="errors.has('verificationCode')" class="help text-danger">{{ errors.first('verificationCode') }}</small>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-lg-10 mt-3 mb-2">
                <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
                  {{ 'forms.buttons.confirm' | translate }}
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
  import { routerHelper } from '../../../helpers'
import Spinner from 'vue-simple-spinner'

export default {
    name: 'verify-user',
    metaInfo () {
      return {
        title: this.$t('titles.verifyUser')
      }
    },
    components: {
      AppAlert,
      Spinner
    },
    data () {
      return {
        isLoading: false,
        verificationCode: '',
        isErrorAlert: false,
        errorAlertMessage: ''
      }
    },
    methods: {
      async doVerifyUser () {
        if (!await this.$validator.validateAll()) return

        this.startLoading()

        const verificationDetails = {
          uuid: this.$store.getters.userDetails.uuid,
          code: this.verificationCode
        }

        try {
          await this.$store.dispatch('verifyUser', verificationDetails)
          this.$store.dispatch('doLogout')
          routerHelper.verifyUserDone()
        } catch (error) {
          this.handleFailedVerification(error)
        }

        this.stopLoading()
      },
      handleFailedVerification (error) {
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

<style scoped>
  .-verify-user-widget {
    margin: 100px auto !important;
  }

  .-spinner {
    position: absolute;
    top: 120px;
    right: 40px;
  }

  .-alert {
    position: absolute;
    width :100%;
    top: 30px;
    left: 0;
  }
</style>
