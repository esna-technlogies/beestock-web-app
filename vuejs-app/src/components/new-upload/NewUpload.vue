<template>
    <div class="new-upload">
      <div class="row no-gutters justify-content-center">
        <div class="col-10 col-sm-10 col-md-8 col-lg-6">
          <vuestic-widget :class="'-photos-widget'">
            New Upload Page
          </vuestic-widget>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'new-upload',
    metaInfo () {
      return {
        title: this.$t('titles.newUpload')
      }
    }
  }
</script>

<style scoped>

</style>
