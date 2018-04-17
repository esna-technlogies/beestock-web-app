<template>
    <div class="category-photos">
      <page-pre-loader v-if="isPageDataLoading"/>

      <div v-show="!isPageDataLoading">
        <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

        <vuestic-widget class="-category-photos-widget -transparent-widget">
          <template v-for="(container, index) in photosContainerList">
            <component :is="container" :key="container.name" :photoList="photoList[index]"></component>
          </template>

          <div class="row justify-content-center mt-3" v-if="!noMorePhotos">
            <div class="col-2">
              <button class="btn btn-block btn-info btn-micro rounded-0" @click="loadMorePhotos" v-if="!isLoadingMorePhotos">
                <span>LOAD MORE</span>
              </button>

              <div class="btn btn-block btn-info btn-micro pt-1 pb-1 rounded-0" :disabled="true" v-else>
                <spinner
                  :size="27"
                  :line-size="3"
                  :line-fg-color="'#F9CB55'"
                  class="-spinner"/>
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
</template>

<script>
  import PhotosContainer from '../photos-container/PhotosContainer'
  import Spinner from 'vue-simple-spinner'
  import PagePreLoader from '../loaders/PagePreLoader'

  import photoService from '../../services/photo'
  import categoryService from '../../services/category'
  import {breadcrumbsHelper} from '../../helpers'
  import {handleServiceError} from '../../helpers/error-handlers'
  import {loadComponentDataMixin} from '../../mixins'

  export default {
    name: 'category-photos',
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
      PagePreLoader,
      PhotosContainer
    },
    mixins: [
      loadComponentDataMixin
    ],
    data () {
      return {
        pageTitle: this.$t('titles.loading'),
        page: 1,
        limit: 4,
        isLoadingMorePhotos: false,
        noMorePhotos: false,
        category: {},
        photoList: [],
        photosContainerList: [PhotosContainer],
        isPageDataLoading: false
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.categoryPhotos(this.category.title)
      }
    },
    watch: {
      category () {
        this.pageTitle = this.$t('titles.categoryPhotos', { categoryTitle: this.category.title })
      }
    },
    methods: {
      async prepareComponentData () {
        try {
          this.category = await this.fetchCategoryDetails()
          const photos = await this.fetchCategoryPhotos()
          this.photoList.push(photos)
        } catch (error) {
          handleServiceError(error, this.$route)
        }
      },
      fetchCategoryDetails () {
        return categoryService.findByUUID(this.uuid)
          .then(response => response.data.category)
      },
      async fetchCategoryPhotos () {
        const queryParams = { page: this.page, limit: this.limit }

        const response = await photoService.findAllByCategoryUUID(this.uuid, queryParams).then(response => response)

        if (!response.data._links.next) { this.noMorePhotos = true }

        return Object.values(response.data.photos)
      },
      async loadMorePhotos () {
        this.isLoadingMorePhotos = true

        this.page++
        const photos = await this.fetchCategoryPhotos()
        this.photoList.push(photos)
        this.photosContainerList.push(PhotosContainer)

        this.isLoadingMorePhotos = false
      }
    },
    created () {
      this.loadComponentData()
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
    background: no-repeat center center;
    border-bottom: 0;
    height: 100%;
    cursor: pointer;
    transition: all 1s;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -o-transition: all 1s;
  }

  /*.-image-wrapper:hover .-image,
  .-image-wrapper:focus .-image {
    transform: scale(1.3);
  }*/


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
      font-size: .8em;
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
</style>
