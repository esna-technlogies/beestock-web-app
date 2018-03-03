<template>
  <div class="signup">
    <div class="row no-gutters justify-content-center">
      <div class="col-7">
        <vuestic-widget :class="'-logout-widget'">
          <vuestic-alert type="danger" v-show="isErrorAlert" class="-alert">
            <span class="badge badge-pill badge-danger">{{'notificationsPage.alerts.danger' | translate}}</span>
            {{ errorAlertMessage }}
          </vuestic-alert>

          <hollow-dots-spinner
            :animation-duration="1000"
            :dot-size="15"
            :dots-num="3"
            color="#4ab2e3"
            class="-spinner"
            v-show="isLoading" />

          <div class="col-12 text-center m-0 p-0">
            <span class="h4"><strong>{{ 'forms.heads.signup' | translate }}</strong></span>
          </div>

          <div class="col-12">
            <hr class="mt-4 mb-3">
          </div>

          <form name="signup" @submit.prevent="doSignup">
            <div class="row justify-content-center">
              <div class="col-lg-11">
                <div class="row justify-content-between">
                  <div class="col-lg-6">
                    <fieldset>
                      <div class="form-group mb-1" :class="{ 'has-error': errors.has('firstName') }">
                        <div class="input-group">
                          <input
                            type="text"
                            id="-firstname"
                            name="firstName"
                            v-model="firstName"
                            v-validate.initial="'required|alpha_spaces|min:3'"
                            data-vv-as="First Name"
                            :placeholder="'forms.labels.firstName' | translate"
                            required>
                          <i class="bar"></i>
                          <small v-show="errors.has('firstName')" class="help text-danger">{{ errors.first('firstName') }}</small>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div class="col-lg-6">
                    <fieldset>
                      <div class="form-group mb-1" :class="{ 'has-error': errors.has('lastName') }">
                        <div class="input-group">
                          <input
                            type="text"
                            id="-lastname"
                            name="lastName"
                            v-model="lastName"
                            v-validate.initial="'required|alpha_spaces|min:3'"
                            :placeholder="'forms.labels.lastName' | translate"
                            data-vv-as="Last Name"
                            required>
                          <i class="bar"></i>
                          <small v-show="errors.has('lastName')" class="help text-danger">{{ errors.first('lastName') }}</small>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div class="col-lg-11">
                <div class="row justify-content-between">
                  <div class="col-lg-6">
                    <fieldset>
                      <div class="form-group mb-1" :class="{ 'has-error': errors.has('email') }">
                        <div class="input-group">
                          <input
                            type="email"
                            id="-email"
                            name="email"
                            v-model="email"
                            v-validate="'required|email'"
                            data-vv-as="Email Address"
                            :placeholder="'forms.labels.email' | translate"
                            required>
                          <i class="bar"></i>
                          <small v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</small>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div class="col-lg-6">
                    <fieldset>
                      <div class="form-group mb-2" :class="{ 'has-error': errors.has('password') }">
                        <div class="input-group">
                          <input
                            type="password"
                            id="-password"
                            name="password"
                            v-model="password"
                            v-validate.initial="'required|min:6'"
                            :placeholder="'forms.labels.password' | translate"
                            data-vv-as="Password"
                            required>
                          <i class="bar"></i>
                          <small v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</small>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div class="col-lg-11">
                <div class="row justify-content-between">
                  <div class="col-lg-6 mb-2">
                    <fieldset>
                      <div class="input-group">
                        <input
                          type="hidden"
                          name="country"
                          v-model="country"
                          v-validate.initial="'required'"
                          data-vv-as="Country"
                          required>
                        <multiselect
                          label="name"
                          track-by="name"
                          name="country"
                          :class="'rounded-0'"
                          :options="countryList"
                          :custom-label="nameWithCountryCode"
                          :placeholder="'forms.selects.country' | translate"
                          v-model="country"
                          required>
                        </multiselect>
                      </div>
                    </fieldset>
                    <small v-show="errors.has('country')" class="help text-danger">{{ errors.first('country') }}</small>
                  </div>

                  <div class="col-lg-6">
                    <fieldset>
                      <div class="form-group mb-2" :class="{ 'has-error': errors.has('mobileNumber') }">
                        <div class="input-group">
                          <input
                            type="text"
                            id="-mobile-number"
                            name="mobileNumber"
                            v-model="mobileNumber"
                            v-validate.initial="'required|numeric'"
                            data-vv-as="Mobile Number"
                            :placeholder="'forms.labels.mobileNumber' | translate"
                            required>
                          <i class="bar"></i>
                          <small v-show="errors.has('mobileNumber')" class="help text-danger">{{ errors.first('mobileNumber') }}</small>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div class="col-lg-11">
                <fieldset>
                  <div class="form-check mb-0 abc-checkbox abc-checkbox-primary">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="termsAccepted"
                      name="termsAccepted"
                      v-model="termsAccepted"
                      v-validate.initial="'required'"
                      data-vv-as="Terms Field"
                      required>
                    <label class="form-check-label" for="termsAccepted">
                      <span class="abc-label-text">{{ 'forms.misc.acceptTheLicenceAgreement' | translate }}</span>
                    </label>
                  </div>
                  <span><small v-show="errors.has('termsAccepted')" class="help text-danger">{{ errors.first('termsAccepted') }}</small></span>
                </fieldset>
              </div>

              <div class="col-lg-11 mt-3 mb-2">
                <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
                  {{ 'forms.buttons.signup' | translate }}
                </button>
              </div>

              <div class="col-lg-11 text-center mt-2">
                <span>
                  {{ 'forms.misc.alreadyHaveAccount' | translate }} <router-link :to="{ name: 'Login' }">{{ 'forms.misc.signInHere' | translate }}</router-link>
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
  import Multiselect from 'vue-multiselect';
  import { HollowDotsSpinner } from 'epic-spinners';

  import CountryList from '../../../data/country-list';
  import VuesticPreLoader from "../../vuestic-components/vuestic-preloader/VuesticPreLoader";

  import { routerHelper } from '../../../helpers'


  export default {
    name: 'signup',
    components: {
      Multiselect,
      VuesticPreLoader,
      HollowDotsSpinner,
    },
    data() {
      return {
        isLoading: false,
        isErrorAlert: false,
        errorAlertMessage: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        country: '',
        mobileNumber: '',
        termsAccepted: false,
        countryList: CountryList
      }
    },
    methods: {
      doSignup () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.startLoading();
            this.clearErrorAlert();

            const userDetails = this.createUserDetailsFromFormData();

            this.$store.dispatch('doSignup', userDetails)
              .then(response => {
                this.handleSuccessSignUp(response);
              })
              .catch(error => {
                this.handleFailedSigninUp(error);
              })
              .finally(() => {
                this.stopLoading();
              });
          }
        });
      },
      createUserDetailsFromFormData () {
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          language: 'en_US',
          country: this.country.abbr,
          termsAccepted: this.termsAccepted,
          accessInfo: {
            password: this.password
          },
          mobileNumber: {
            number: this.mobileNumber[0] === '0'? this.mobileNumber : `0${this.mobileNumber}`,
            countryCode: this.country.abbr
          }
        }
      },
      handleSuccessSignUp (response) {
        routerHelper.signUpDone(response.status);
      },
      handleFailedSigninUp (error) {
        if (!error.response) {
          this.setErrorAlert('Please check your internet connection');
          return;
        }

        // this.setErrorAlert(error.response.data.error.message);

        const errorDetails = error.response.data.error.details;

        for (const field of Object.keys(errorDetails)) {
          const errorMessage = errorDetails[field].message.split(' - ');

          const message = errorMessage.length === 1 ? errorMessage[0] : errorMessage[1];

          this.errors.add(field, message);
        }

        this.setErrorAlert(error.response.data.error.message);
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
      },
      nameWithCountryCode ({ name, countryCode }) {
        return `${name} — [${countryCode}]`;
      },
    },
    created () {
      if (this.$store.getters.authInfo) {
        return this.$router.replace({ name: 'Home' });
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';

  /*.signup {
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
    !*width: 21.375rem;*!

    .down-container {
      margin-top: 2.6875rem;
    }
  }*/

  .-logout-widget {
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
