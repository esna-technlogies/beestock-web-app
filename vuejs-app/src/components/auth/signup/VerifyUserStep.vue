<template>
  <div class="verify-user-step">
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

        <div class="col-lg-10 text-right">
          <span>
            <router-link to="#">{{ 'Send code again?' | translate }}</router-link>
          </span>
        </div>
      </div>
    </form>

    <basic-loader v-show="isLoading" />
  </div>
</template>

<script>
  import BasicLoader from '../../loaders/BasicLoader'

  export default {
    name: 'verify-user-step',
    props: {
      registeredUser: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      BasicLoader
    },
    data () {
      return {
        isLoading: false,
        verificationCode: ''
      }
    },
    methods: {
      async doVerifyUser () {
        if (!await this.$validator.validateAll()) return

        this.startLoading()
        this.clearErrorAlert()

        const verificationDetails = {
          uuid: this.registeredUser.uuid,
          code: this.verificationCode
        }

        console.log('verificationDetails', verificationDetails)

        try {
          await this.$store.dispatch('verifyUser', verificationDetails)
          this.verifyUserIsStepDone()
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
        this.$emit('clearErrorAlert')
      },
      setErrorAlert (message = 'Default Error Message') {
        this.$emit('setErrorAlert', message)
      },
      verifyUserIsStepDone (registeredUser) {
        this.$emit('verifyUserStepDone', registeredUser)
      }
    }
  }
</script>

<style scoped>

</style>
