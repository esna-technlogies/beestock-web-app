<template>
    <div class="user-uploads">
      <vuestic-widget :class="'-category-widget -transparent-widget'">
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


        <photos-container :photoList="photoList" v-if="isPhotoList"></photos-container>

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
                  Upload Photo
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

        <photos-container :photoList="photoList" v-if="isPhotoList"></photos-container>

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
                  Upload Illustration
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

        <photos-container :photoList="photoList" v-if="isPhotoList"></photos-container>

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
                  Upload Footage
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

        <photos-container :photoList="photoList" v-if="isPhotoList"></photos-container>

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
                  Upload Audio
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </vuestic-widget>

      <!--<div class="row no-gutters justify-content-center">
        <div class="col-12 mt-3">
          <under-construction :pageTitle="pageTitle"/>
        </div>
      </div>-->
    </div>
</template>

<script>
    import UnderConstruction from '../under-construction/UnderConstruction'

    import photoService from '../../services/photo'
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
        uuid () {
          return this.$store.getters.userDetails.uuid
        },
        isPhotoList () {
          return this.photoList.length > 0
        }
      },
      methods: {
        async prepareComponent () {
          this.startLoading()

          try {
            await this.fetchUserPhotos()
          } catch (error) {
            console.error('BEESTOCK-ERROR', error.response ? error.response : error)
          }

          this.stopLoading()
        },
        async fetchUserPhotos () {
          const queryParams = {
            page: 1,
            limit: 4
          }
          this.photoList = await photoService.findAllByUserUUID(this.uuid, queryParams)
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

<style scoped>

</style>
