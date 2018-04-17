<template>
  <div class="not-verified-alert">
    <vuestic-alert type="warning" :class="'justify-content-center'">
      <span class="badge badge-pill badge-warning">
        {{'notificationsPage.alerts.warning' | translate}}
      </span>
      <span>
        {{ 'alerts.messages.notVerified.text' | translate }}
        <router-link
          :to="{ name: 'VerifyUser' }"
          class="-verify-now-link"
        >
          {{ 'alerts.messages.notVerified.linkText' | translate }}
        </router-link>.
      </span>
    </vuestic-alert>
  </div>
</template>

<script>
  export default {
    name: 'not-verified-alert'
  }
</script>

<style lang="scss" scoped>
  .-verify-now-link {
    color: #225194;
    text-decoration: underline;
  }
</style>
