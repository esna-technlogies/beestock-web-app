<template>
  <div class="audio">
    <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

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
  import VuesticBreadcrumbs from '../vuestic-components/vuestic-breadcrumbs/VuesticBreadcrumbs'

  import {breadcrumbsHelper} from '../../helpers'

  export default {
    name: 'audio',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      UnderConstruction,
      VuesticBreadcrumbs
    },
    data () {
      return {
        pageTitle: this.$t('titles.audio')
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.audio()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
