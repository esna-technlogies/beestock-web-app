<template>
   <div class="my-audio">
     <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

     <div class="row no-gutters justify-content-center" v-if="this.$route.name === 'MyAudio'">
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
    name: 'my-audio',
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
        pageTitle: this.$t('titles.myAudio')
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.myAudio()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
