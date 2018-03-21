<template>
   <div class="categories">
     <template v-if="isCategoriesRoute">
       <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

       <div class="row no-gutters justify-content-center">
         <div class="col-12 mt-3">
           <under-construction :pageTitle="pageTitle"/>
         </div>
       </div>
     </template>

     <router-view v-else/>
   </div>
</template>

<script>
  import {breadcrumbsHelper} from '../../helpers'
  import UnderConstruction from '../under-construction/UnderConstruction'

  export default {
    name: 'categories',
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
        pageTitle: this.$t('titles.categories')
      }
    },
    computed: {
      isCategoriesRoute () {
        return this.$route.name === 'Categories'
      },
      breadcrumbs () {
        return breadcrumbsHelper.categories()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
