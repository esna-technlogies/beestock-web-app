<template>
  <div class="network-error">
    <div class="row no-gutters justify-content-center">
      <div class="col-12 mt-3">
        <vuestic-widget class="-network-error-widget -transparent-widget">
          <div class="row text-center">
            <div class="col-12">
              <img src="../../assets/images/network-error.png" alt="Network Error">
            </div>

            <div class="col-12 mt-4">
              <h5>{{ 'errors.networkError' | translate }}</h5>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import UnderConstruction from '../under-construction/UnderConstruction'

  export default {
    name: 'network-error',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      UnderConstruction
    },
    data () {
      return {
        pageTitle: this.$t('titles.networkError')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
