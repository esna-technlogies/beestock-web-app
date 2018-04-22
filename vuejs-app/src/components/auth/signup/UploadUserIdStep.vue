<template>
  <div class="upload-user-id-step">
    <div class="col-12 text-center">
      <h5><strong>{{ 'forms.heads.uploadUserId' | translate }}</strong></h5>

      <div>
        <p class="small m-0">Before you submit content, we need to verify your identity.</p>
        <p class="small m-0">It keeps your work safe and helps us speed up the payment process.</p>

        <p class="small m-0 mt-2">Please add a full size image of you passport, driver's license, or state identification.</p>
        <a href="#" class="small m-0">More Information</a>

        <p class="small m-0 mt-2">Your identification must be issued by the same country as your residential address.</p>
        <a href="#" class="small m-0">Edit your address</a>
      </div>

    </div>

    <div class="col-12">
      <hr class="mt-4 mb-3">
    </div>

    <form name="verifyUser" @submit.prevent="doUploadUserId">
      <div class="row justify-content-center">
        <div class="col-lg-5 text-center">
          <fieldset>
            <div>
              <p class="small m-0">Drag and drop file here</p>
              <p class="small m-0">or</p>
            </div>
            <div class="form-group mb-1">
              <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
                CHOOSE FILE
              </button>
            </div>
            <div>
              <p class="small m-0">(file format JPEG, TIFF, or PDF)</p>
            </div>
          </fieldset>
        </div>

        <div class="col-lg-10 mt-3 mb-2">
          <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
            {{ 'forms.buttons.upload' | translate }}
          </button>
        </div>

        <div class="col-lg-10 text-right">
          <span>
            <router-link to="#">{{ 'forms.misc.sendItAgain' | translate }}</router-link>
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
    name: 'upload-user-id-step',
    components: {
      BasicLoader
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      async doUploadUserId () {
        // if (!await this.$validator.validateAll()) return

        this.startLoading()
        this.clearErrorAlert()

        try {
          this.uploadUserIdStepIsDone()
        } catch (error) {
          this.handleFailedUploadUserId(error)
        }

        this.stopLoading()
      },
      handleFailedUploadUserId (error) {
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
      uploadUserIdStepIsDone () {
        this.$emit('uploadUserIdStepDone')
      }
    }
  }
</script>

<style scoped>

</style>
