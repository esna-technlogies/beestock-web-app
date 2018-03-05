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

          <hollow-dots-spinner
            :animation-duration="1000"
            :dot-size="15"
            :dots-num="3"
            color="#4ab2e3"
            class="-spinner"
            v-show="isLoading" />

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
  import { HollowDotsSpinner } from 'epic-spinners';
  import AppAlert from '../../app-alert/AppAlert'
  import { routerHelper } from '../../../helpers';

  export default {
    name: "verify-user",
    metaInfo: {
      title: 'Verify User'
    },
    components: {
      AppAlert,
      HollowDotsSpinner
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
      doVerifyUser () {
        this.$validator.validateAll().then(result => {
          this.startLoading();

          if (result) {
            const verificationDetails = {
              uuid: this.$store.getters.authInfo.userId,
              code: this.verificationCode
            };

            this.$store.dispatch('verifyUser', verificationDetails)
              .then(response => {
                this.handleSuccessVerification(response);
              })
              .catch(error => {
                this.handleFailedVerification(error);
              })
              .finally(() => {
                this.stopLoading();
              });
          }
        });
      },
      handleSuccessVerification (response) {
        this.$store.dispatch('doLogout');
        routerHelper.verifyUserDone();
      },
      handleFailedVerification (error) {
        if (!error.response) {
          this.setErrorAlert('Unknown error, please call the website administrator');
          return;
        }

        this.setErrorAlert(error.response.data.error.message);

        console.error(error.response);
      },
      startLoading () {
        this.isLoading = true;
      },
      stopLoading () {
        this.isLoading = false;
      },
      clearErrorAlert () {
        this.isErrorAlert = false;
        this.errorAlertMessage = '';
      },
      setErrorAlert (message = 'Default Error Alert Message') {
        this.isErrorAlert = true;
        this.errorAlertMessage = message;
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
