<template>
    <div class="user-uploads">
      <div class="row no-gutters justify-content-center">
        <div class="col-12 mt-3">
          <under-construction :pageTitle="pageTitle"/>
        </div>
      </div>
    </div>
</template>

<script>
    import UnderConstruction from '../under-construction/UnderConstruction'

    export default {
      name: 'user-uploads',
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
          pageTitle: this.$t('titles.myUploads')
        }
      }
    }
</script>

<style scoped>

</style>
