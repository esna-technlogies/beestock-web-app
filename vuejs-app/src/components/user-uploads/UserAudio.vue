<template>
   <div class="user-audio">
     <div class="row no-gutters justify-content-center" v-if="this.$route.name === 'UserAudio'">
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
    name: 'user-audio',
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
        pageTitle: this.$t('titles.userAudio')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
