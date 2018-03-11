<template>
  <div class="footage">
    <div class="row no-gutters justify-content-center">
      <div class="col-10 col-sm-10 col-md-8 col-lg-6">
        <vuestic-widget :class="'-photos-widget'">
          Footage Page
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footage',
    metaInfo () {
      return {
        title: this.$t('titles.footage')
      }
    }
  }
</script>

<style scoped>

</style>
