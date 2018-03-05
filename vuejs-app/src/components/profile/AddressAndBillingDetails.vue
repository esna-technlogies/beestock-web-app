<template>
  <div class="address-and-billing-details">
    <form name="address-and-billing-details" @submit.prevent="doSaveChanges">
      <div class="row justify-content-center">
        <div class="col-6">
          <vuestic-alert type="danger" v-show="isErrorAlert">
            <span class="badge badge-pill badge-danger">{{'notificationsPage.alerts.danger' | translate}}</span>
            {{ errorAlertMessage }}
          </vuestic-alert>
        </div>
      </div>


      <div class="row justify-content-center">
        <div class="col-11">
          <div class="row justify-content-center">
            <div class="col-6 mb-3 text-center">
              <fieldset>
                <div class="form-check mb-0 abc-checkbox abc-checkbox-primary">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="-billing-address"
                    name="billingAddress"
                    v-model="billingAddress"
                    v-validate.initial="'required'"
                    data-vv-as="Billing Address"
                    required>
                  <label class="form-check-label" for="-billing-address">
                    <span class="abc-label-text">{{ 'forms.checkboxes.billingAddress' | translate }}</span>
                  </label>
                </div>
                <span><small v-show="errors.has('billingAddress')" class="help text-danger">{{ errors.first('billingAddress') }}</small></span>
              </fieldset>
            </div>
          </div>

        </div>

        <!--<div class="col-6">
        </div>-->

        <div class="col-11">
          <div class="row justify-content-center">
            <div class="col-6 mb-3">
              <fieldset>
                <div class="input-group">
                  <input
                    type="hidden"
                    name="billingCountry"
                    v-model="billingCountry"
                    v-validate.initial="'required'"
                    data-vv-as="Billing Country"
                    required>
                  <multiselect
                    label="name"
                    track-by="name"
                    name="country"
                    :class="'rounded-0'"
                    :options="countryList"
                    :placeholder="'forms.selects.country' | translate"
                    v-model="billingCountry"
                    required>
                  </multiselect>
                </div>
              </fieldset>
              <small v-show="errors.has('country')" class="help text-danger">{{ errors.first('country') }}</small>
            </div>
          </div>
        </div>

        <div class="col-11">
          <div class="row justify-content-center">
            <div class="col-6 mb-3">
              <fieldset>
                <div class="input-group">
                  <input
                    type="hidden"
                    name="billingCurrency"
                    v-model="billingCurrency"
                    v-validate.initial="'required'"
                    data-vv-as="Billing Currency"
                    required>
                  <multiselect
                    label="name"
                    track-by="name"
                    name="currency"
                    :class="'rounded-0'"
                    :options="currencyList"
                    :placeholder="'forms.selects.currency' | translate"
                    v-model="billingCurrency"
                    required>
                  </multiselect>
                </div>
              </fieldset>
              <small v-show="errors.has('currency')" class="help text-danger">{{ errors.first('currency') }}</small>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  import CountryList from '../../data/country-list';

  export default {
    name: "address-and-billing-details",
    meta: {
      title: 'Address & Billing Details'
    },
    components: {
      Multiselect
    },
    data () {
      return {
        isLoading: false,
        isErrorAlert: false,
        errorAlertMessage: '',
        billingAddress: '',
        currencyList: [
          {
            name: "US Dollar",
            currency: "US"
          }
        ],
        billingCurrency: '',
        countryList: CountryList,
        billingCountry: ''
      }
    }
  }
</script>

<style scoped>

</style>
