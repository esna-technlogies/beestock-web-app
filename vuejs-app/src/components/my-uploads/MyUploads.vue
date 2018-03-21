<template>
    <div class="my-uploads">
      <page-pre-loader v-if="isPageDataLoading"/>

      <div v-show="!isPageDataLoading">
        <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

        <vuestic-widget class="-category-widget -transparent-widget">
          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.photos' | translate }}</span>
            </div>

            <router-link
              class="col-1 badge badge-info"
              :style="{ 'font-size': '.9em' }"
              :to="{ name: 'MyPhotos' }"
              v-if="isPhotoList"
            >
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>


          <photos-container :photoList="photoList" v-if="isPhotoList"/>

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


          <div class="row no-gutters mb-2 justify-content-center">
            <hr class="col-12">
          </div>


          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.illustrations' | translate }}</span>
            </div>

            <router-link
              class="col-1 badge badge-info"
              :style="{ 'font-size': '.9em' }"
              :to="{ name: 'MyIllustrations' }"
              v-if="isPhotoList"
            >
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>

          <photos-container :photoList="photoList" v-if="isPhotoList"/>

          <div class="row justify-content-center mt-3" v-else>
            <div class="well">
              <div class="row justify-content-center">
                <div class="col-12 text-center">
                  {{'alerts.messages.findMyIllustrations.404' | translate}}
                </div>

                <div class="col-12 text-center mt-3">
                  <router-link
                    :to="{ name: 'NewUpload' }"
                    class="badge badge-info" style="font-size: .8em; padding: 10px;"
                  >
                    {{ 'user.buttons.uploadIllustration' | translate }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>


          <div class="row no-gutters mb-2 justify-content-center">
            <hr class="col-12">
          </div>


          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.footage' | translate }}</span>
            </div>

            <router-link
              class="col-1 badge badge-info"
              :style="{ 'font-size': '.9em' }"
              :to="{ name: 'MyFootage' }"
              v-if="isPhotoList"
            >
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>

          <photos-container :photoList="photoList" v-if="isPhotoList"/>

          <div class="row justify-content-center mt-3" v-else>
            <div class="well">
              <div class="row justify-content-center">
                <div class="col-12 text-center">
                  {{'alerts.messages.findMyFootage.404' | translate}}
                </div>

                <div class="col-12 text-center mt-3">
                  <router-link
                    :to="{ name: 'NewUpload' }"
                    class="badge badge-info" style="font-size: .8em; padding: 10px;"
                  >
                    {{ 'user.buttons.uploadFootage' | translate }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>


          <div class="row no-gutters mb-2 justify-content-center">
            <hr class="col-12">
          </div>


          <div class="row no-gutters justify-content-between">
            <div class="col-1">
              <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.audio' | translate }}</span>
            </div>

            <router-link
              class="col-1 badge badge-info"
              :style="{ 'font-size': '.9em' }"
              :to="{ name: 'MyAudio' }"
              v-if="isPhotoList"
            >
              {{ 'category.buttons.showAll' | translate }}
            </router-link>
          </div>

          <photos-container :photoList="photoList" v-if="isPhotoList"/>

          <div class="row justify-content-center mt-3" v-else>
            <div class="well">
              <div class="row justify-content-center">
                <div class="col-12 text-center">
                  {{'alerts.messages.findMyAudio.404' | translate}}
                </div>

                <div class="col-12 text-center mt-3">
                  <router-link
                    :to="{ name: 'NewUpload' }"
                    class="badge badge-info" style="font-size: .8em; padding: 10px;"
                  >
                    {{ 'user.buttons.uploadAudio' | translate }}
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
  import PhotosContainer from '../photos-container/PhotosContainer'
  import PagePreLoader from '../loaders/PagePreLoader'

  import photoService from '../../services/photo'
  import {breadcrumbsHelper} from '../../helpers'
  import {loadComponentData} from '../../helpers/loader-wrappers'
  import {handleServiceError} from '../../helpers/error-handlers'

  export default {
    name: 'my-uploads',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      PagePreLoader,
      PhotosContainer
    },
    data () {
      return {
        pageTitle: this.$t('titles.myUploads'),
        photoList: [],
        isPageDataLoading: false
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.myUploads()
      },
      uuid () {
        return this.$store.getters.currentUserUUID()
      },
      isPhotoList () {
        return this.photoList.length > 0
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
      fetchMyPhotos () {
        const queryParams = {
          page: 1,
          limit: 4
        }
        return photoService.findAllByUserUUID(this.uuid, queryParams)
          .then(response => Object.values(response.data.photos))
      }
    },
    created () {
      loadComponentData(this)
    }
  }
</script>

<style lang="scss" scoped>

</style>
