<template>
  <div class="photo">
    <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

    <div class="row no-gutters justify-content-center">
      <div class="col-12 mt-3">
        <vuestic-widget class="-photo-widget -transparent-widget" v-if="showPhotoWidget">
          <div class="row justify-content-center">
            <div class="col-10 -image-wrapper">
              <img :src="photo.file_storage.sizes.size_1000" :alt="photo.title">

              <router-link
                :to="{ name: 'Category', params: { uuid: photoCategory.uuid } }"
                :class="'-category-name btn btn-warning text-center'"
              >
                {{ photoCategory.title }}
              </router-link>
            </div>
          </div>

          <div class="row no-gutters">
            <hr class="col-10">
          </div>

          <div class="row justify-content-center mt-3">
            <div class="col-5 text-left">
              <h5>{{ photo.title }}</h5>
              <p>{{ photo.description }}</p>
            </div>

            <div class="col-5">
              <h5 class="text-left"><strong>Keywords</strong></h5>
              <template v-for="keyword in photo.keywords">
                <a class="badge badge-success text-dark border-info mr-3 mb-2" style="font-size: 1em;">{{ keyword }}</a>
              </template>
            </div>
          </div>

          <div class="row no-gutters">
            <hr class="col-10">
          </div>

          <div class="row justify-content-center mt-1">
            <div class="col-5">
              <div class="row justify-content-center">
                <div class="col-6">
                  <button class="btn btn-light border border-info btn-block btn-micro rounded-0">DOWNLOAD</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-light border border-info btn-block btn-micro rounded-0">Add To Lightbox</button>
                </div>
              </div>
            </div>

            <div class="col-5">
              <div class="row no-gutters justify-content-start">
                <div class="col-2 mr-3">
                  <img src="../../assets/images/author.jpg" alt="Profile Image" style="width: 100%">
                </div>

                <div class="col-8 text-left">
                  <div><strong>{{ photoUser.full_name }}</strong></div>
                  <div>{{ photoUser.country }}</div>
                  <!--<div>11 Mar 2018 10:03 PM</div>-->
                  <div>{{ photo.created.sec | moment("D MMM YYYY, h:mm A") }}</div>
                </div>
              </div>
            </div>
          </div>

        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import UnderConstruction from '../under-construction/UnderConstruction'

  import photoService from '../../services/photo'
  import userService from '../../services/user'
  import categoryService from '../../services/category'
  import {breadcrumbsHelper} from '../../helpers'

  export default {
    name: 'photo',
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
      UnderConstruction
    },
    data () {
      return {
        pageTitle: this.$t('titles.loading'),
        photo: '',
        photoUser: '',
        photoCategory: ''
      }
    },
    computed: {
      breadcrumbs () {
        return breadcrumbsHelper.photo(this.photo.title)
      },
      showPhotoWidget () {
        return this.photo && this.photoUser && this.photoCategory
      }
    },
    watch: {
      photo () {
        this.pageTitle = this.$t('titles.photo', { photoTitle: this.photo.title })
      }
    },
    methods: {
      async prepareComponent () {
        this.showPageLoader()

        try {
          await this.fetchPhotoDetails()
          await this.fetchPhotoUser()
          await this.fetchPhotoCategory()
        } catch (error) {
          console.error('BEESTOCK-ERROR', error.response ? error.response : error)
        }

        this.hidePageLoader()
      },
      async fetchPhotoDetails () {
        this.photo = await photoService.findByUUID(this.uuid)
          .then(response => response.data.photo)
      },
      async fetchPhotoUser () {
        this.photoUser = await userService.findByUUID(this.photo.user)
          .then(response => response.data.user)
      },
      async fetchPhotoCategory () {
        this.photoCategory = await categoryService.findByUUID(this.photo.category)
          .then(response => response.data.category)
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
  .-transparent-widget {
    background: rgba(255, 255, 255, 0.95)
  }

  .-photo-widget {
    position: relative;
  }

  .-image-wrapper {
    background: url(../../assets/images/top-right.png) no-repeat,url(../../assets/images/bottom-left.png) no-repeat;
    background-position: top right , bottom left;
    background-size: 10%;
    padding: 20px;
    position: relative;

    img {
      width: 100%;
    }

    .-category-name {
      position: absolute;
      top: 40px;
      right: 40px;
      align-items: center;
      color: black;
      font-size: 1.2em;
      padding: 0.13rem .3rem 0.13rem .5rem;
    }
  }
</style>
