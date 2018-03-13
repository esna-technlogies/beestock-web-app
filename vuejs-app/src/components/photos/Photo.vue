<template>
  <div class="photo">
    <div class="row no-gutters justify-content-center">
      <div class="col-12 mt-3">
        <under-construction :pageTitle="pageTitle" />
      </div>
    </div>
  </div>
</template>

<script>
  import UnderConstruction from '../under-construction/UnderConstruction'

  import photoService from '../../services/photo'

  export default {
    name: 'photo',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    props: {
      uuid: {
        type: String,
        default: ''
      }
    },
    components: {
      UnderConstruction
    },
    data () {
      return {
        pageTitle: this.$t('titles.loading'),
        photo: {}
      }
    },
    watch: {
      photo () {
        this.pageTitle = this.$t('titles.photo', { photoTitle: this.photo.title })
      }
    },
    methods: {
      async prepareComponent () {
        this.startLoading()

        try {
          await this.fetchPhotoDetails()
          // await this.fetchCategoryPhotos()
        } catch (error) {
          console.log('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.stopLoading()
      },
      async fetchPhotoDetails () {
        this.photo = await photoService.findByUUID(this.uuid)
          .then(response => response.data.photo)
      },
      startLoading () {
        this.$store.commit('setLoading', true)
      },
      stopLoading () {
        this.$store.commit('setLoading', false)
      }
    },
    created () {
      this.prepareComponent()
    }
  }
</script>

<style scoped>

</style>
