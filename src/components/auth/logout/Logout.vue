<template>
  <div class="logout">
    <div class="row no-gutters justify-content-center">
      <div class="col-10 col-sm-10 col-md-8 col-lg-6">
        <vuestic-widget :class="'-logout-widget'">
          <div class="col-12 text-center">
            <h4><strong>{{ 'forms.heads.logout' | translate }}</strong></h4>
          </div>

          <div class="col-12">
            <hr class="mt-4 mb-3">
          </div>

          <div class="row justify-content-center">
            <span>Successfully logged out, now redirecting to <router-link :to="{ name: 'Home' }">Home Page</router-link></span>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import { routerHelper } from "../../../helpers";

  export default {
    name: "logout",
    created () {
      if (!this.$store.getters.authInfo) {
        return this.$router.replace({ name: 'Home' });
      }

      this.$store.dispatch('doLogout');
      setTimeout(() => routerHelper.logoutDone(), 500);
    }
  }
</script>

<style scoped>
  .-logout-widget {
    margin: 100px auto !important;
  }
</style>
