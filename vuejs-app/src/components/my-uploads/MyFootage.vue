<template>
   <div class="my-footage">
     <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

     <div class="row no-gutters justify-content-center" v-if="this.$route.name === 'MyFootage'">
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
    name: 'my-footage',
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
        pageTitle: this.$t('titles.myFootage')
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.myFootage()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
