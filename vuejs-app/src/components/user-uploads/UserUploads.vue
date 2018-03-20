<template>
    <div class="user-uploads">
      <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

      <vuestic-widget class="-category-widget -transparent-widget">
        <div class="row no-gutters justify-content-between">
          <div class="col-1">
            <span class="badge badge-info" style="font-size: .9em">{{ 'category.heads.photos' | translate }}</span>
          </div>

          <router-link
            class="col-1 badge badge-info"
            :style="{ 'font-size': '.9em' }"
            :to="{ name: 'UserPhotos' }"
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
            :to="{ name: 'UserIllustrations' }"
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
                {{'alerts.messages.findUserIllustrations.404' | translate}}
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
            :to="{ name: 'UserFootage' }"
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
                {{'alerts.messages.findUserFootage.404' | translate}}
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
            :to="{ name: 'UserAudio' }"
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
                {{'alerts.messages.findUserAudio.404' | translate}}
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
</template>

<script>
  import photoService from '../../services/photo'
  import {breadcrumbsHelper} from '../../helpers'

  import UnderConstruction from '../under-construction/UnderConstruction'
  import PhotosContainer from '../photos-container/PhotosContainer'
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'

  export default {
    name: 'user-uploads',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      VuesticAlert,
      PhotosContainer,
      UnderConstruction
    },
    data () {
      return {
        pageTitle: this.$t('titles.userUploads'),
        photoList: []
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.userUploads()
      },
      uuid () {
        return this.$store.getters.currentUserUUID()
      },
      isPhotoList () {
        return this.photoList.length > 0
      }
    },
    methods: {
      async prepareComponent () {
        this.showPageLoader()

        try {
          await this.fetchUserPhotos()
        } catch (error) {
          console.error('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.hidePageLoader()
      },
      async fetchUserPhotos () {
        const queryParams = {
          page: 1,
          limit: 4
        }
        this.photoList = await photoService.findAllByUserUUID(this.uuid, queryParams)
          .then(response => Object.values(response.data.photos))
      },
      showPageLoader () {
        this.$store.commit('setPageLoader', true)
      },
      hidePageLoader () {
        this.$store.commit('setPageLoader', false)
      }
    },
    created () {
      this.prepareComponent()
    }
  }
</script>

<style lang="scss" scoped>

</style>
