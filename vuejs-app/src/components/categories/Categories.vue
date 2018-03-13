<template>
   <div class="categories">

     <template v-if="isCategoriesRoute">
       <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

       <div class="row no-gutters justify-content-center">
         <div class="col-10 col-sm-10 col-md-8 col-lg-6">
           <vuestic-widget :class="'-categories-widget'">
             Categories Page
           </vuestic-widget>


           <router-link :to="{ name: 'CategoryPhotos', params: {uuid: '122ab71b-d971-4d04-b7cc-1b2acd11d7f1'} }">122ab71b-d971-4d04-b7cc-1b2acd11d7f1</router-link>
         </div>
       </div>
     </template>

     <!--<router-view v-on:expandBreadcrumbs="expandBreadcrumbs" v-else/>-->
     <router-view v-else/>
   </div>
</template>

<script>
  import {breadcrumbsHelper} from '../../helpers'

export default {
    name: 'categories',
    metaInfo () {
      return {
        title: this.$t('titles.categories')
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
