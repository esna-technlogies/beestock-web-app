<template>
    <div class="category">
      <template v-if="isCategoryRoute">
        <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

        <vuestic-widget :class="'-category-widget -transparent-widget'">
          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.photos' | translate }}</span>
            </div>

            <router-link class="col-1 badge badge-info"
                         :style="{ 'font-size': '.9em' }"
                         :to="{ name: 'CategoryPhotos', params: {uuid: this.uuid} }">
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>


          <photos-container :photoList="photoList"></photos-container>


          <div class="row no-gutters mb-2 justify-content-center">
            <hr class="col-12">
          </div>


          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.illustrations' | translate }}</span>
            </div>

            <router-link class="col-1 badge badge-info"
                         :style="{ 'font-size': '.9em' }"
                         :to="{ name: 'CategoryIllustrations', params: {uuid: this.uuid} }">
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>

          <photos-container :photoList="photoList"></photos-container>


          <div class="row no-gutters mb-2 justify-content-center">
            <hr class="col-12">
          </div>


          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.footage' | translate }}</span>
            </div>

            <router-link class="col-1 badge badge-info"
                         :style="{ 'font-size': '.9em' }"
                         :to="{ name: 'CategoryFootage', params: {uuid: this.uuid} }">
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>

          <photos-container :photoList="photoList"></photos-container>


          <div class="row no-gutters mb-2 justify-content-center">
            <hr class="col-12">
          </div>


          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.audio' | translate }}</span>
            </div>

            <router-link class="col-1 badge badge-info"
                         :style="{ 'font-size': '.9em' }"
                         :to="{ name: 'CategoryAudio', params: {uuid: this.uuid} }">
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>

          <photos-container :photoList="photoList"></photos-container>

          <!--<div class="row justify-content-start">
            <div class="col-12">
              <div class="row no-gutters justify-content-between">
                <div class="col-1">
                  <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.audio' | translate }}</span>
                </div>

                <router-link class="col-1 badge badge-info"
                             :style="{ 'font-size': '.9em' }"
                             :to="{ name: 'CategoryPhotos', params: {uuid: this.uuid} }">
                  {{ 'category.buttons.showAll' | translate }}
                </router-link>
              </div>
            </div>

            <div class="col-3 mt-3" v-for="(photo, photoIndex) in photoList">
              <div class="-image-wrapper">
                <div class="-image"
                     :key="photoIndex"
                     :style="{ backgroundImage: 'url(' + photo.file_storage.sizes.size_250 + ')' }">
                </div>

                <div class="-photo-details">
                  <span class="-photo-creation-moment">
                   {{ photo.created.sec | moment("MMM Do YYYY, h:mm A") }}
                  </span>
                  <span class="-photo-title">
                   {{ photo.title }}
                  </span>
                  <span aria-hidden="true" class="-photo-download-icon fa fa-download"></span>
                </div>
              </div>
            </div>
          </div>-->

        </vuestic-widget>
      </template>

      <router-view v-else />
    </div>
</template>

<script>
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'
  import PhotosContainer from '../photos-container/PhotosContainer'

  import photoService from '../../services/photo'
  import categoryService from '../../services/category'
  import {breadcrumbsHelper} from '../../helpers'

export default {
    name: 'category',
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
      VuesticAlert,
      PhotosContainer
    },
    data () {
      return {
        pageTitle: this.$t('titles.loading'),
        category: '',
        photoList: []
      }
    },
    computed: {
      isCategoryRoute () {
        return this.$route.name === 'Category'
      },
      breadcrumbs () {
        return breadcrumbsHelper.category(this.category.title)
      }
    },
    watch: {
      category () {
        this.pageTitle = this.$t('titles.category', { categoryTitle: this.category.title })
      }
    },
    methods: {
      async prepareComponent () {
        this.startLoading()

        try {
          await this.fetchCategoryDetails()
          await this.fetchCategoryPhotos()
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
        this.photoList = await photoService.findAllByCategoryUUID(this.uuid, { page: 1, limit: 4 })
          .then(response => Object.values(response.data.photos))
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
      font-size: .8em;
      position: absolute;
      top: 0.05rem;
    }

    .-photo-creation-moment {
      font-size: .7em;
      position: absolute;
      bottom: 0.05rem;
    }

    .-photo-download-icon {
      font-size: .9em;
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
