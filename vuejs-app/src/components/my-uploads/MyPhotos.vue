<template>
   <div class="my-photos">
     <page-pre-loader v-if="isPageDataLoading"/>

     <div v-show="!isPageDataLoading">
       <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

       <vuestic-widget class="-photos-widget -transparent-widget">
         <div class="row no-gutters mb-4 justify-content-center">
           <vuetable-pagination ref="pagination"
                                :css="css.pagination.micro"
                                :onEachSide="onEachSide"
                                @vuetable-pagination:change-page="onChangePage">
           </vuetable-pagination>
         </div>

         <photos-container
           v-if="photoList.length > 0"
           :photoList="photoList"
           :isPaginationDataLoading="isPaginationDataLoading" />

         <div class="row justify-content-center mt-3" v-else>
           <div class="well">
             <div class="row justify-content-center">
               <div class="col-12 text-center">
                 {{'alerts.messages.findMyPhotos.404' | translate}}
               </div>

               <div class="col-12 text-center mt-3">
                 <router-link
                   :to="{ name: 'NewUpload' }"
                   class="badge badge-info" style="font-size: .8em; padding: 10px;"
                 >
                   {{ 'user.buttons.uploadPhoto' | translate }}
                 </router-link>
               </div>
             </div>
           </div>
         </div>
       </vuestic-widget>
     </div>
   </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import PhotosContainer from '../photos-container/PhotosContainer'
  import UnderConstruction from '../under-construction/UnderConstruction'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import PagePreLoader from '../loaders/PagePreLoader'

  import {breadcrumbsHelper} from '../../helpers'
  import photoService from '../../services/photo'
  import DataTableStyles from '../vuestic-components/vuestic-datatable/data/data-table-styles'
  import {handleServiceError} from '../../helpers/error-handlers'
  import {loadComponentData, loadPageData} from '../../helpers/loader-wrappers'

  export default {
    name: 'my-photos',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      Spinner,
      PagePreLoader,
      PhotosContainer,
      UnderConstruction,
      VuetablePagination
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.myPhotos()
      },
      isMyPhotosRoute () {
        return this.$route.name === 'MyPhotos'
      },
      uuid () {
        return this.$store.getters.currentUserUUID()
      }
    },
    data () {
      return {
        pageTitle: this.$t('titles.myPhotos'),
        css: DataTableStyles,
        onEachSide: 1,
        currentPage: 1,
        perPage: 12,
        category: {},
        photoList: [],
        paginationData: {},
        responseData: {},
        isPageDataLoading: false,
        isPaginationDataLoading: false
      }
    },
    methods: {
      async prepareComponentData () {
        try {
          this.photoList = await this.fetchMyPhotos()
        } catch (error) {
          handleServiceError(error, this.$route)
        }
      },
      async fetchMyPhotos () {
        const queryParams = {
          page: this.currentPage,
          limit: this.perPage
        }

        const response = await photoService.findAllByUserUUID(this.uuid, queryParams).then(response => response)
        this.setPaginationData(response.data)
        return Object.values(response.data.photos)
      },
      async preparePageData () {
        try {
          this.photoList = await this.fetchMyPhotos()
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
          loadPageData(this)
        }
      },
      gotoNextPage () {
        if (this.currentPage < this.paginationData.last_page) {
          this.currentPage++
          loadPageData(this)
        }
      },
      gotoPage (page) {
        if (page !== this.currentPage && (page > 0 && page <= this.paginationData.last_page)) {
          this.currentPage = page
          loadPageData(this)
        }
      }
    },
    created () {
      if (this.isMyPhotosRoute) loadComponentData(this)
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
