<template>
  <div class="audio">
    <div class="row no-gutters justify-content-center" v-if="this.$route.name === 'Audio'">
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
    name: 'audio',
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
        pageTitle: this.$t('titles.audio')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
