<!--suppress ALL -->
<template>
  <div class="photos">
    <page-pre-loader v-if="isPageDataLoading"/>

    <div v-show="!isPageDataLoading">
      <main-alert v-if="alertType" :alertType="alertType" :alertMessage="alertMessage"/>

      <template v-if="isPhotosRoute">
        <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

        <vuestic-widget class="-photos-widget -transparent-widget">
          <div class="row no-gutters mb-4 justify-content-center">
            <vuetable-pagination
              ref="pagination"
              :css="css.pagination.micro"
              :onEachSide="onEachSide"
              @vuetable-pagination:change-page="onChangePage"/>
          </div>

          <photos-container
            :isPaginationDataLoading="isPaginationDataLoading"
            :photoList="photoList"/>
        </vuestic-widget>
      </template>

      <router-view v-else/>
    </div>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import MainAlert from '../alerts/MainAlert'
  import PagePreLoader from '../loaders/PagePreLoader'
  import PhotosContainer from '../photos-container/PhotosContainer'
  import UnderConstruction from '../under-construction/UnderConstruction'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'

  import {breadcrumbsHelper} from '../../helpers'
  import photoService from '../../services/photo'
  import {handleServiceError} from '../../helpers/error-handlers'
  import {loadComponentDataMixin, loadPageDataMixin} from '../../mixins'
  import DataTableStyles from '../vuestic-components/vuestic-datatable/data/data-table-styles'

  export default {
    name: 'photos',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    props: {
      alertType: {
        type: String,
        default: ''
      },
      alertMessage: {
        type: String,
        default: ''
      }
    },
    components: {
      Spinner,
      MainAlert,
      PagePreLoader,
      PhotosContainer,
      UnderConstruction,
      VuetablePagination
    },
    mixins: [
      loadComponentDataMixin,
      loadPageDataMixin
    ],
    data () {
      return {
        isPageDataLoading: false,
        isPaginationDataLoading: false,
        pageTitle: this.$t('titles.photos'),
        css: DataTableStyles,
        onEachSide: 1,
        currentPage: 1,
        perPage: 12,
        category: {},
        photoList: [],
        paginationData: {}
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.photos()
      },
      isPhotosRoute () {
        return this.$route.name === 'Photos'
      }
    },
    watch: {
      async '$route' (to, from) {
        if (to.name === 'Photos') await this.loadComponentData()
      }
    },
    methods: {
      async prepareComponentData () {
        try {
          this.photoList = await this.fetchOnePhotosPage()
        } catch (error) {
          handleServiceError(error, this.$route)
        }
      },
      async fetchOnePhotosPage () {
        const queryParams = {
          page: this.currentPage,
          limit: this.perPage
        }

        const response = await photoService.findAll(queryParams).then(response => response)
        this.setPaginationData(response.data)

        return Object.values(response.data.photos)
      },
      async preparePageData () {
        try {
          this.photoList = await this.fetchOnePhotosPage()
        } catch (error) {
          handleServiceError(error, this.$route)
        }
      },
      setPaginationData (data) {
        this.paginationData = this.getPaginationData(data)
        this.$refs.pagination.setPaginationData(this.paginationData)
      },
      getPaginationData (data) {
        let last = data._links.last ? data._links.last.href : data._links.self.href
        let lastPage = parseInt(last.match(/page=\d+/i)[0].replace('page=', ''))
        let total = lastPage * this.perPage
        let currentPage = data._links.self.page_number

        return {
          total: total,
          per_page: this.perPage,
          current_page: currentPage,
          last_page: lastPage,
          next_page_url: data._links.next ? data._links.next.href : null,
          prev_page_url: data._links.prev ? data._links.prev.href : null,
          from: (currentPage - 1) * this.perPage + 1,
          to: Math.min(currentPage * this.perPage, total)
        }
      },
      onChangePage (page) {
        this.changePage(page)
      },
      changePage (page) {
        if (page === 'prev') {
          this.gotoPreviousPage()
        } else if (page === 'next') {
          this.gotoNextPage()
        } else {
          this.gotoPage(page)
        }
      },
      gotoPreviousPage () {
        if (this.currentPage > 1) {
          this.currentPage--
          this.loadPageData()
        }
      },
      gotoNextPage () {
        if (this.currentPage < this.paginationData.last_page) {
          this.currentPage++
          this.loadPageData()
        }
      },
      gotoPage (page) {
        if (page !== this.currentPage && (page > 0 && page <= this.paginationData.last_page)) {
          this.currentPage = page
          this.loadPageData()
        }
      }
    },
    created () {
      if (this.isPhotosRoute) this.loadComponentData()
    }
  }
</script>

<style lang="scss" scoped>
  .-transparent-widget {
    background: rgba(255, 255, 255, 0.95)
  }

  .-photos-widget {
    position: relative;
  }
</style>
