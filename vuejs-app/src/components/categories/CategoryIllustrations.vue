<template>
    <div class="category-illustrations">
      <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

      <vuestic-widget class="-category-illustrations-widget -transparent-widget">
        <div class="row no-gutters mb-4 justify-content-center">
          <vuetable-pagination ref="pagination"
                               :css="css.pagination.micro"
                               :onEachSide="onEachSide"
                               @vuetable-pagination:change-page="onChangePage">
          </vuetable-pagination>
        </div>

        <photos-container
          :photoList="photoList"
          :isPaginateLoader="isPaginateLoader"/>
      </vuestic-widget>
    </div>
</template>

<script>
  import PhotosContainer from '../photos-container/PhotosContainer'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import Spinner from 'vue-simple-spinner'
  import DataTableStyles from '../vuestic-components/vuestic-datatable/data/data-table-styles'

  import photoService from '../../services/photo'
  import categoryService from '../../services/category'
  import {breadcrumbsHelper} from '../../helpers'

  export default {
    name: 'category-illustrations',
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
      Spinner,
      PhotosContainer,
      VuetablePagination
    },
    data () {
      return {
        pageTitle: this.$t('titles.loading'),
        css: DataTableStyles,
        onEachSide: 1,
        currentPage: 1,
        perPage: 4,
        category: {},
        photoList: [],
        paginationData: {},
        isPaginateLoader: false
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.categoryIllustrations(this.category.title)
      }
    },
    watch: {
      category () {
        this.pageTitle = this.pageTitle = this.$t('titles.categoryIllustrations', { categoryTitle: this.category.title })
      }
    },
    methods: {
      async prepareComponent () {
        this.showPageLoader()

        try {
          this.category = await this.fetchCategoryDetails()
          this.photoList = await this.fetchCategoryPhotos()
        } catch (error) {
          console.error('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.hidePageLoader()
      },
      fetchCategoryDetails () {
        return categoryService.findByUUID(this.uuid)
          .then(response => response.data.category)
      },
      fetchCategoryPhotos () {
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
      async renderNewPage () {
        this.showPaginateLoader()

        try {
          this.photoList = await this.fetchCategoryPhotos()
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
      this.prepareComponent()
    }
  }
</script>

<style lang="scss" scoped>
  .-image-wrapper {
    height: 10rem;
    width: 100%;
    padding: 0;
    overflow: hidden;
    border: .9px solid #EBEBEB;
    box-shadow: 0px 5px 50px -20px #595959;
  }

  .-image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-bottom: 0;
    height: 100%;
    cursor: pointer;
    transition: all .5s;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
  }

  .-image-wrapper:hover .-image,
  .-image-wrapper:focus .-image {
    transform: scale(1.2);
  }


  .bottom-information {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 18%;
    font-weight: 400;

    .-photo-title {
      top: .4rem;
      left: .7rem;
      font-size: 85%;
      position: absolute;
      cursor: pointer;
    }

    .-photo-creation-moment {
      top: .5rem;
      right: .7rem;
      font-size: 70%;
      position: absolute;
    }
  }

  .top-information {
    top: 0;
    left: 0;
    width: 100%;
    height: 18%;
    font-weight: 400;
    padding: 0 .7rem .2rem .7rem;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);


    .zoom-in {
      top: .3rem;
      right: .7rem;
      position: absolute;
    }
  }

  .photo-information {
    min-height: 5rem;
    padding: .5rem .7rem;
    background-color: white;
    border: 2px solid #EBEBEB;
    border-top: 0;
    font-family: 'Source Sans Pro', sans-serif;

    .title {
      color: #2B2B2B;
    }

    .title:hover {
      color: #6f6665;
      cursor: pointer;
      text-decoration: underline;
    }

    .description {
      color: #706666;
      font-size: .9em;
    }
  }

  .-photo-details {
    bottom: 35px;
    left: 0px;
    width: 100%;
    height: 22%;
    padding: 0 .5rem;
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;
    color: white;

    * {
      /*padding: 0.13rem .3rem 0.13rem .5rem;*/
      color: white;
      font-size: .75em;
    }

    .-photo-title {
      font-size: .75em;
      position: absolute;
      bottom: 0.05rem;
    }

    .-photo-creation-moment {
      font-size: .7em;
      position: absolute;
      top: 0.05rem;
    }

    .-photo-download-icon {
      font-size: 1.1em;
      position: absolute;
      right: .5rem;
      top: 35%;
    }
  }

  .hidden {
    display: none
  }

  .-transparent-widget {
    background: rgba(255, 255, 255, 0.95)
  }


  .-category-illustrations-widget {
    position: relative;
  }
</style>
