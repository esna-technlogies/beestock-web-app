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
  import {handleServiceError} from '../../helpers/error-handlers'
  import {loadComponentDataMixin} from '../../mixins'

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
    mixins: [
      loadComponentDataMixin
    ],
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
      this.loadComponentData()
    }
  }
</script>

<style lang="scss" scoped>

</style>
