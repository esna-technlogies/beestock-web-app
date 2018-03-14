<template>
    <div class="category-footage">
      <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

      <div class="row justify-content-start">
        <div class="col-12 mt-3">
          <under-construction :pageTitle="pageTitle"/>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import UnderConstruction from '../under-construction/UnderConstruction'

  import photoService from '../../services/photo'
  import categoryService from '../../services/category'
  import {breadcrumbsHelper} from '../../helpers'

  export default {
    name: 'category-footage',
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
    data () {
      return {
        pageTitle: this.$t('titles.loading'),
        category: {},
        photoList: () => []
      }
    },
    components: {
      UnderConstruction
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.categoryFootage(this.category.title)
      }
    },
    watch: {
      category () {
        this.pageTitle = this.$t('titles.categoryFootage', { categoryTitle: this.category.title })
      }
    },
    methods: {
      async prepareComponent () {
        this.startLoading()

        try {
          await this.fetchCategoryDetails()
          // await this.fetchCategoryPhotos()
        } catch (error) {
          console.error('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.stopLoading()
      },
      async fetchCategoryDetails () {
        this.category = await categoryService.findByUUID(this.uuid)
          .then(response => response.data.category)
      },
      async fetchCategoryPhotos () {
        const queryParams = {
          page: this.currentPage,
          limit: this.perPage
        }

        return photoService.findAllByCategoryUUID(this.uuid, queryParams)
          .then(response => {
            this.setPaginationData(response.data)
            return Object.values(response.data.photos)
          })
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

<style lang="scss" scoped>

</style>
