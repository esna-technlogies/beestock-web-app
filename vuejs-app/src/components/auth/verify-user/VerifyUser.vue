<template>
  <div class="verify-user">
    <div class="row no-gutters justify-content-center">
      <div class="col-10 col-sm-10 col-md-8 col-lg-6">
        <form-error-alert v-show="isErrorAlert" :alert-message="errorAlertMessage"/>

        <vuestic-widget class="-verify-user-widget">
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

          <basic-loader v-show="isLoading" />
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import BasicLoader from '../../loaders/BasicLoader'

  import { routerHelper } from '../../../helpers'
  import FormErrorAlert from '../../alerts/FormErrorAlert'

  export default {
    name: 'verify-user',
    metaInfo () {
      return {
        title: this.$t('titles.verifyUser')
      }
    },
    components: {
      Spinner,
      BasicLoader,
      FormErrorAlert
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
          uuid: this.$store.getters.currentUserUUID(),
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

<style lang="scss" scoped>
  .-verify-user-widget {
    margin: 100px auto !important;
    position: relative;
  }

  .-alert {
    position: absolute;
    width :100%;
    top: 30px;
    left: 0;
  }


</style>
