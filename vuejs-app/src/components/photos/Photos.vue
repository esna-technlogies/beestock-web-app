<template>
  <div class="photos">
    <template v-if="isPhotosRoute">
      <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

      <vuestic-widget :class="'-photos-widget -transparent-widget'">
        <spinner
          v-show="isLoadingNewPage"
          :size="35"
          :line-size="5"
          :line-fg-color="'#F9CB55'"
          class="-spinner"/>

        <div class="row no-gutters mb-4 justify-content-center">
          <vuetable-pagination ref="pagination"
                               :css="css.pagination.micro"
                               :onEachSide="onEachSide"
                               @vuetable-pagination:change-page="onChangePage">
          </vuetable-pagination>
        </div>

        <photos-container :photoList="photoList"></photos-container>
      </vuestic-widget>
    </template>

    <router-view v-else/>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import PhotosContainer from '../photos-container/PhotosContainer'
  import UnderConstruction from '../under-construction/UnderConstruction'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'


  import {breadcrumbsHelper} from '../../helpers'
  import photoService from '../../services/photo'
  import DataTableStyles from '../vuestic-components/vuestic-datatable/data/data-table-styles'

  export default {
    name: 'photos',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      Spinner,
      PhotosContainer,
      UnderConstruction,
      VuetablePagination
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.photos()
      },
      isPhotosRoute () {
        return this.$route.name === 'Photos'
      }
    },
    data () {
      return {
        pageTitle: this.$t('titles.photos'),
        css: DataTableStyles,
        onEachSide: 1,
        currentPage: 1,
        perPage: 12,
        category: {},
        photoList: [],
        paginationData: {},
        isLoadingNewPage: false,
        responseData: {}
      }
    },
    watch: {
      async '$route' (to, from) {
        if (to.name === 'Photos') await this.prepareComponent()
      }
    },
    methods: {
      async prepareComponent () {
        this.startLoading()

        try {
          this.photoList = await this.fetchCategoryPhotos()
        } catch (error) {
          console.log('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.stopLoading()
      },
      fetchCategoryPhotos () {
        const queryParams = {
          page: this.currentPage,
          limit: this.perPage
        }

        return photoService.findAll(queryParams)
          .then(response => {
            this.responseData = response.data
            this.setPaginationData(this.responseData)
            return Object.values(response.data.photos)
          })
      },
      async renderNewPage () {
        this.startLoadingNewPage()

        try {
          this.photoList = await this.fetchCategoryPhotos()
        } catch (error) {
          console.log('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.stopLoadingNewPage()
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
          this.renderNewPage()
        }
      },
      gotoNextPage () {
        if (this.currentPage < this.paginationData.last_page) {
          this.currentPage++
          this.renderNewPage()
        }
      },
      gotoPage (page) {
        if (page !== this.currentPage && (page > 0 && page <= this.paginationData.last_page)) {
          this.currentPage = page
          this.renderNewPage()
        }
      },
      startLoading () {
        this.$store.commit('setLoading', true)
      },
      stopLoading () {
        this.$store.commit('setLoading', false)
      },
      startLoadingNewPage () {
        this.isLoadingNewPage = true
      },
      stopLoadingNewPage () {
        this.isLoadingNewPage = false
      }
    },
    created () {
      if (this.isPhotosRoute) this.prepareComponent()
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

  .-spinner {
    position: absolute;
    top: 25px;
    right: 25px;
  }
</style>
