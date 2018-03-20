<template>
  <div class="profile">
    <div class="row no-gutters justify-content-center">
      <div class="col-10 col-sm-10 col-md-8 col-lg-12">
        <vuestic-widget class="-profile-widget mb-0">

          <div class="row justify-content-center">
            <div class="col-6">
              <nav class="nav nav-pills nav-justified">
                <router-link to="#" class="nav-item nav-link">Overview</router-link>
                <router-link :to="{name: 'ProfileDetails'}" class="nav-item nav-link active">Profile</router-link>
                <router-link to="#" class="nav-item nav-link">Invoices</router-link>
                <router-link to="#" class="nav-item nav-link">Downloads</router-link>
              </nav>
            </div>
          </div>

          <div class="row">
            <hr class="col-12 mt-2 mb-2 p-0">
          </div>

          <div class="row justify-content-center">
            <div class="col-8">
              <nav class="nav nav-pills nav-justified">
                <router-link
                  :to="{name: 'ProfileDetails'}"
                  :active-class="'active'"
                  class="nav-item nav-link">Details</router-link>

                <router-link
                  :to="{name: 'AddressAndBillingDetails'}"
                  :active-class="'active'"
                  class="nav-item nav-link">Address & Billing Details</router-link>

                <router-link
                  :to="{name: 'ChangePassword'}"
                  :active-class="'active'"
                  class="nav-item nav-link">Change Password</router-link>
              </nav>
            </div>

            <div style="color: #41DF7C" v-show="isSuccessOperation" class="-spinner">
              <span class="align-middle mr-1">SAVED</span>
              <span aria-hidden="true" class="fa fa-check-circle align-middle" style="font-size: 25px;"></span>
            </div>
          </div>

          <div class="row">
            <hr class="col-12 mt-2 mb-4 p-0">
          </div>

          <router-view
            v-on:loadingStarted="startLoading"
            v-on:loadingStopped="stopLoading"
            v-on:successOperation="operationSucceeded" />

        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'


  export default {
    name: 'profile',
    components: {
      Spinner
    },
    data () {
      return {
        isSuccessOperation: false
      }
    },
    methods: {
      operationSucceeded () {
        this.isSuccessOperation = true
      },
      startLoading () {
        this.isSuccessOperation = false
      },
      stopLoading () {
        this.isLoading = false
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true
        this.errorAlertMessage = message
      },
      clearErrorAlert () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
      },
      resetAll () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
        this.isSuccessOperation = false
      }
    },
    watch: {
      '$route' (to, from) {
        this.resetAll()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .-spinner {
    position: absolute;
    top: 90px;
    right: 20px;
  }

  .-alert {
    position: absolute;
    width :100%;
    top: -10px;
    left: 0;
  }
</style>
