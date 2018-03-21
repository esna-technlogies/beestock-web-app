<template>
    <div class="category-audio">
      <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

      <div class="row justify-content-start">
        <div class="col-12 mt-3">
          <under-construction :pageTitle="pageTitle"/>
        </div>
      </div>
    </div>
</template>

<script>
  import UnderConstruction from '../under-construction/UnderConstruction'

  import photoService from '../../services/photo'
  import categoryService from '../../services/category'
  import {breadcrumbsHelper} from '../../helpers'
  import {handleServiceError} from '../../helpers/error-handlers'
  import {loadComponentData} from '../../helpers/loader-wrappers'

  export default {
    name: 'category-audio',
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
        category: {},
        photoList: []
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.categoryAudio(this.category.title)
      }
    },
    watch: {
      category () {
        this.pageTitle = this.$t('titles.categoryAudio', { categoryTitle: this.category.title })
      }
    },
    methods: {
      async prepareComponentData () {
        try {
          this.category = await this.fetchCategoryDetails()
          // await this.fetchCategoryPhotos()
        } catch (error) {
          handleServiceError(error, this.$route)
        }
      },
      fetchCategoryDetails () {
        return categoryService.findByUUID(this.uuid)
          .then(response => response.data.category)
      },
      async fetchCategoryPhotos () {
        const queryParams = {
          page: this.currentPage,
          limit: this.perPage
        }

        const response = await photoService.findAllByCategoryUUID(this.uuid, queryParams).then(response => response)
        this.setPaginationData(response.data)
        return Object.values(response.data.photos)
      }
    },
    created () {
      loadComponentData(this)
    }
  }
</script>

<style lang="scss" scoped>

</style>
