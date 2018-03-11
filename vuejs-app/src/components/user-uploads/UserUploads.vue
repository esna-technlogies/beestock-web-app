<template>
    <div class="user-uploads">
      <div class="row no-gutters justify-content-center">
        <div class="col-10 col-sm-10 col-md-8 col-lg-6">
          <vuestic-widget :class="'-photos-widget'">
            User Uploads Page
          </vuestic-widget>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'user-uploads',
      metaInfo () {
        return {
          title: this.$t('titles.myUploads')
        }
      }
    }
</script>

<style scoped>

</style>
