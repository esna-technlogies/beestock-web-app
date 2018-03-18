<template>
   <div class="user-illustrations">
     <div class="row no-gutters justify-content-center" v-if="this.$route.name === 'UserIllustrations'">
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
    name: 'user-illustrations',
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
        pageTitle: this.$t('titles.userIllustrations')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
