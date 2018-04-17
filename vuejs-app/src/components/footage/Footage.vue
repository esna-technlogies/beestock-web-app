<template>
  <div class="footage">
    <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

    <div class="row no-gutters justify-content-center" v-if="this.$route.name === 'Footage'">
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
    name: 'footage',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      VuesticBreadcrumbs,
      UnderConstruction
    },
    data () {
      return {
        pageTitle: this.$t('titles.footage')
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.footage()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
