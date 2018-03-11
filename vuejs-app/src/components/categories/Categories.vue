<template>
   <div class="categories">

     <div class="row no-gutters justify-content-center" v-if="!showCategoryPage">
       <div class="col-10 col-sm-10 col-md-8 col-lg-6">
         <vuestic-widget :class="'-categories-widget'">
           Categories Page
         </vuestic-widget>
       </div>
     </div>

     <router-view v-else="showCategoryPage"/>
   </div>
</template>

<script>
  export default {
    name: 'categories',
    metaInfo () {
      return {
        title: this.$t('titles.categories')
      }
    },
    computed: {
      showCategoryPage () {
        return this.$route.name === 'Category'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
