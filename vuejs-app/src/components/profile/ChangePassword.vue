<template>
  <div class="change-password">
    <form name="changePassword" @submit.prevent="doChangePassword">
      <div class="row justify-content-center">
        <div class="col-6">
          <vuestic-alert type="danger" v-show="isErrorAlert">
            <span class="badge badge-pill badge-danger">{{'notificationsPage.alerts.danger' | translate}}</span>
            {{ errorAlertMessage }}
          </vuestic-alert>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-6">
          <div class="row justify-content-between">
            <div class="col-lg-6">
              <fieldset>
                <div class="form-group mb-2" :class="{ 'has-error': errors.has('password') }">
                  <div class="input-group">
                    <input
                      type="password"
                      id="-password"
                      name="password"
                      v-model="password"
                      v-validate.initial="'required'"
                      :placeholder="'forms.labels.password' | translate"
                      data-vv-as="Password"
                      required>
                    <i class="bar"></i>
                    <small v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</small>
                    <small v-show="errors.has('accessInfo')" class="help text-danger">{{ errors.first('accessInfo') }}</small>
                  </div>
                </div>
              </fieldset>
            </div>

            <div class="col-lg-6">
              <fieldset>
                <div class="form-group mb-2" :class="{ 'has-error': errors.has('passwordConfirmation') }">
                  <div class="input-group">
                    <input
                      type="password"
                      id="-password-confirmation"
                      name="passwordConfirmation"
                      v-validate.initial="'required|confirmed:password'"
                      :placeholder="'forms.labels.passwordConfirmation' | translate"
                      data-vv-as="Password Confirmation"
                      required>
                    <i class="bar"></i>
                    <small v-show="errors.has('passwordConfirmation')" class="help text-danger">{{ errors.first('passwordConfirmation') }}</small>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-6 mt-3 mb-2">
          <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
            {{ 'forms.buttons.confirm' | translate }}
          </button>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import userService from '../../services/user'

  export default {
    name: 'change-password',
    metaInfo () {
      return {
        title: this.$t('titles.changePassword')
      }
    },
    data () {
      return {
        isLoading: false,
        isErrorAlert: false,
        errorAlertMessage: '',
        password: ''
      }
    },
    computed: {
      uuid () {
        return this.$store.getters.userDetails.uuid
      }
    },
    methods: {
      async doChangePassword () {
        if (!await this.$validator.validateAll()) return

        this.$emit('loadingStart')
        this.clearErrorAlert()

        const queryParams = {
          accessInfo: {
            password: this.password
          }
        }

        try {
          await userService.updateByUUID(this.uuid, queryParams)
          this.$emit('successOperation')
        } catch (error) {
          this.handleFailedChangePassword(error)
        }

        this.$emit('loadingStop')
      },
      handleFailedChangePassword (error) {
        if (!error.response) {
          this.setErrorAlert("Unknown error, please call the website's administrator")
        } else {
          const errorDetails = error.response.data.error.details

          for (const field of Object.keys(errorDetails)) {
            const errorMessage = errorDetails[field].message.split(' - ')

            const message = errorMessage.length === 1 ? errorMessage[0] : errorMessage[1]

            this.errors.add(field, message)
          }

          this.setErrorAlert(error.response.data.error.message)
        }
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true
        this.errorAlertMessage = message
      },
      clearErrorAlert () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
