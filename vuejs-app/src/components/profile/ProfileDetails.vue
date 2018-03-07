<template>
  <div class="profile-details">
      <form name="profileDetails" @submit.prevent="doSaveChanges">
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
        </div>

        <div class="row justify-content-center">
          <div class="col-6">
            <fieldset>
              <div class="form-group mb-2" :class="{ 'has-error': errors.has('email') }">
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
        </div>

        <div class="row justify-content-center">
          <div class="col-6">
            <div class="row justify-content-between">
              <div class="col-lg-6 mt-1 mb-2">
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
        </div>

        <div class="row justify-content-center">
          <div class="col-6 mt-3 mb-2">
            <button class="btn btn-primary btn-micro btn-block rounded-0" :disabled="isLoading">
              {{ 'forms.buttons.saveChanges' | translate }}
            </button>
          </div>
        </div>

      </form>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import { HollowDotsSpinner } from 'epic-spinners';

  import CountryList from '../../data/country-list'

  import userService from '../../services/user';


  export default {
    name: "profile-settings",
    metaInfo: {
        title: "Profile Settings"
    },
    components: {
      Multiselect,
      HollowDotsSpinner,
    },
    data () {
      return {
        isLoading: false,
        isErrorAlert: false,
        errorAlertMessage: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        mobileNumber: '',
        countryList: CountryList
      }
    },
    computed: {
      userUUID () {
        return this.$store.getters.userDetails.uuid;
      }
    },
    methods: {
      async fetchUserDetails (uuid) {
        this.$emit('loadingStart');

        try {
          const user = await userService.findByUUID(uuid).then(response => response.data.user);

          this.firstName = user.first_name;
          this.lastName = user.last_name;
          this.email = user.email;
          this.mobileNumber = user.mobile_number.national_number;

          for (const country of CountryList) {
            if (country.abbr === user.mobile_number.country_code) {
              this.country = country;
              break;
            }
          };

        } catch (error) {
          console.log(error.response ? error.response : error);
        }

        this.$emit('loadingStop');

      },
      async doSaveChanges () {
        if (! await this.$validator.validateAll()) return;

        this.$emit('loadingStart');
        this.clearErrorAlert();

        const queryParams = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          country: this.country.abbr,
          mobileNumber: {
            number: this.mobileNumber,
            countryCode: this.country.abbr
          }
        };

        try {
          await userService.updateByUUID(this.userUUID, queryParams)
          this.$emit('successOperation');

        } catch (error) {
          this.handleFailedUpdate(error);
        }

        this.$emit('loadingStop');
      },
      handleFailedUpdate (error) {
        if (!error.response) {
          this.setErrorAlert("Unknown error, please call the website's administrator");

        } else {
          const errorDetails = error.response.data.error.details;

          for (const field of Object.keys(errorDetails)) {
            const errorMessage = errorDetails[field].message.split(' - ');

            const message = errorMessage.length === 1 ? errorMessage[0] : errorMessage[1];

            this.errors.add(field, message);
          }

          this.setErrorAlert(error.response.data.error.message);
        }
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true;
        this.errorAlertMessage = message;
      },
      clearErrorAlert () {
        this.isErrorAlert = false;
        this.errorAlertMessage = '';
      },
      nameWithCountryCode ({ name, countryCode }) {
        return `${name} — [${countryCode}]`;
      }
    },
    created () {
      this.fetchUserDetails(this.userUUID);
    }
  }
</script>

<style scoped>
  .-spinner {
    position: absolute;
    top: 88px;
    right: 20px;
  }

  .-alert {
    position: absolute;
    width :100%;
    top: -10px;
    left: 0;
  }
</style>
