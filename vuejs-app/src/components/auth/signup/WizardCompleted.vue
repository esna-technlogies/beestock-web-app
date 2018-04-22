<template>
  <div class="wizard-completed">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <span>
          <i class="fa fa-check-square text-primary" style="font-size: 1em"></i>
          <span>{{ message | translate }}</span>
        </span>
      </div>

      <div class="col-12 text-center mt-2">
        <router-link :to="{ name: 'Login' }">{{ 'forms.misc.signInHere' | translate }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wizard-completed',
    props: {
      message: {
        type: String,
        default: 'forms.wizard.completed'
      }
    }
  }
</script>

<style scoped>

</style>
