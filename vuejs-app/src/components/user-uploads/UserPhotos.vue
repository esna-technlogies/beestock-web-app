<template>
   <div class="user-photos" v-show="!isPageLoading">
     <template v-if="isUserPhotosRoute">
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
           :photoList="photoList" v-if="photoList.length > 0"
           :isPaginateLoader="isPaginateLoader"/>

         <div class="row justify-content-center mt-3" v-else>
           <div class="well">
             <div class="row justify-content-center">
               <div class="col-12 text-center">
                 {{'alerts.messages.findUserPhotos.404' | translate}}
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
     </template>

     <router-view v-else/>
   </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import PhotosContainer from '../photos-container/PhotosContainer'
  import UnderConstruction from '../under-construction/UnderConstruction'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'

  import {mapGetters} from 'vuex'

  import {breadcrumbsHelper} from '../../helpers'
  import photoService from '../../services/photo'
  import DataTableStyles from '../vuestic-components/vuestic-datatable/data/data-table-styles'

  export default {
    name: 'user-photos',
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
      ...mapGetters(['isPageLoading']),
      breadcrumbs () {
        return breadcrumbsHelper.userPhotos()
      },
      isUserPhotosRoute () {
        return this.$route.name === 'UserPhotos'
      },
      uuid () {
        return this.$store.getters.currentUserUUID()
      }
    },
    /* watch: {
      async '$route' (to, from) {
        if (to.name === 'UserPhotos') await this.prepareComponent()
      }
    }, */
    data () {
      return {
        pageTitle: this.$t('titles.userPhotos'),
        css: DataTableStyles,
        onEachSide: 1,
        currentPage: 1,
        perPage: 12,
        category: {},
        photoList: [],
        paginationData: {},
        isPaginateLoader: false,
        responseData: {}
      }
    },
    methods: {
      async prepareComponent () {
        this.showPageLoader()

        try {
          this.photoList = await this.fetchUserPhotos()
        } catch (error) {
          console.error('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.hidePageLoader()
      },
      fetchUserPhotos () {
        const queryParams = {
          page: this.currentPage,
          limit: this.perPage
        }

        return photoService.findAllByUserUUID(this.uuid, queryParams)
          .then(response => {
            this.responseData = response.data
            this.setPaginationData(this.responseData)
            return Object.values(response.data.photos)
          })
      },
      async renderNewPage () {
        this.showPaginateLoader()

        try {
          this.photoList = await this.fetchUserPhotos()
        } catch (error) {
          console.error('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.hidePaginateLoader()
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
      showPageLoader () {
        this.$store.commit('setPageLoader', true)
      },
      hidePageLoader () {
        this.$store.commit('setPageLoader', false)
      },
      showPaginateLoader () {
        this.isPaginateLoader = true
      },
      hidePaginateLoader () {
        this.isPaginateLoader = false
      }
    },
    created () {
      if (this.isUserPhotosRoute) this.prepareComponent()
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
