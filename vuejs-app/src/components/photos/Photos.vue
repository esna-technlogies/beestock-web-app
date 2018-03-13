<template>
  <div class="photos">
    <div class="row no-gutters justify-content-center" v-if="isPhotosRoute">
      <div class="col-12 mt-3">
        <under-construction :pageTitle="pageTitle" />
      </div>
    </div>

    <router-view v-else/>
  </div>
</template>

<script>

  import UnderConstruction from '../under-construction/UnderConstruction'

  export default {
    name: 'photos',
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
        isPhotosRoute: this.$route.name === 'Photos',
        pageTitle: this.$t('titles.photos')
      }
    }
  }
</script>

<style scoped>

</style>
