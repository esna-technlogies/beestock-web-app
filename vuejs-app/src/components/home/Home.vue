<template>
    <div class="home">
      <page-pre-loader v-if="isPageDataLoading"/>

      <div v-show="!isPageDataLoading">
        <main-alert v-if="alertType" :alertType="alertType" :alertMessage="alertMessage"/>

        <div class="row no-gutters justify-content-center">
          <search-box></search-box>
        </div>

        <div class="row justify-content-center" style="color: white">
          <div class="col-10 text-center mt-5">
            <h6><strong>Less searching. More finding</strong></h6>
            <h6><strong>Discover royalty-free images, illustrations and videos</strong></h6>
            <h6><strong>that will make you stand out.</strong></h6>

            <div class="row mt-5 justify-content-start">
              <div class="col-3" v-for="(photo, photoIndex) in randomPhotoList">
                <router-link  :to="{ name: 'Category', params: { uuid: photo.category } }">
                  <div class="-image-wrapper">
                    <div class="-image"
                         :key="photoIndex"
                         :style="{ backgroundImage: 'url(' + photo.file_storage.sizes.size_250 + ')' }">
                    </div>

                    <div class="-category-name-wrapper text-center">
                      <div class="-category-name btn btn-warning">
                        {{ photo.category_title }}
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-6 mt-5 text-center">
            <h5><strong>Browse All Categories</strong></h5>

            <div class="row mt-4 justify-content-center">
              <div class="col-3 text-left" v-for="category in categoryList">
                <router-link :to="{ name: 'Category', params: { uuid: category.uuid } }">
                  {{ category.title }}
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-10 text-center mt-5" v-show="!isAuthenticatedUser">
            <h6><strong>Registration is FREE, and as a member you can:</strong></h6>

            <div class="row mt-4 mb-4 justify-content-center">
              <div class="col-5">
                <router-link class="btn btn-primary btn-sm btn-block rounded-0" :to="{ name: 'Register' }">
                  {{ 'forms.buttons.signup' | translate }}
                </router-link>
              </div>
            </div>

            <h6><strong>Download and use free images from our free image section</strong></h6>
            <h6><strong>Download and use free images from our free image section</strong></h6>
            <h6><strong>Download and use free images from our free image section</strong></h6>
            <h6><strong>Download and use free images from our free image section</strong></h6>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
    import SearchBox from '../search/SearchBox'
    import MainAlert from '../alerts/MainAlert'
    import PagePreLoader from '../loaders/PagePreLoader'

    import categoryService from '../../services/category'
    import {loadComponentData} from '../../helpers/loader-wrappers'
    import {handleServiceError} from '../../helpers/error-handlers'

    import {mapGetters} from 'vuex'


    export default {
      name: 'home',
      metaInfo () {
        return {
          title: this.$t('titles.home')
        }
      },
      props: {
        alertType: {
          type: String,
          default: ''
        },
        alertMessage: {
          type: String,
          default: ''
        }
      },
      components: {
        MainAlert,
        SearchBox,
        VuesticWidget,
        PagePreLoader
      },
      data () {
        return {
          // isLoading: false,
          isPageDataLoading: false,
          categoryList: [],
          randomPhotoList: []
        }
      },
      computed: {
        ...mapGetters([
          'isAuthenticatedUser'
        ])
      },
      methods: {
        async prepareComponentData () {
          try {
            await this.setCategoryList()
            await this.setRandomPhotoList()
          } catch (error) {
            handleServiceError(error, this.$route)
          }
        },
        async setCategoryList () {
          const categories = await categoryService.findAll().then(response => response.data.categories)

          for (const category of Object.values(categories)) {
            this.categoryList.push(category)
          }
        },
        async setRandomPhotoList () {
          const fourRandomCategory = await this.selectFourRandomCategory()

          await Promise.all(
            fourRandomCategory.map(async (category) => {
              await categoryService.findRandomPhotoByUUID(category.uuid)
                .then(response => response.data.photo)
                .then(photo => {
                  photo.category_title = category.title
                  this.randomPhotoList.push(photo)
                })
            })
          )
        },
        selectFourRandomCategory () {
          const fourRandomCategory = []

          while (fourRandomCategory.length !== 4) {
            const randomIndex = Math.floor(Math.random() * (this.categoryList.length - 0) - 0)

            if (fourRandomCategory[randomIndex]) continue

            fourRandomCategory.push(this.categoryList[randomIndex])
          }

          return fourRandomCategory
        }
      },
      created () {
        if (this.isAuthenticatedUser) {
          loadComponentData(this)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .-category-name-wrapper {
    bottom: 1px;
    left: 0px;
    width: 100%;
    height: 18%;
    padding: 0 .7rem .2rem .7rem;
    position: absolute;
    border-radius: inherit;

    .-category-name {
      color: black;
      border-radius: 0;
      font-size: .8em;
      padding: 0.13rem .3rem 0.13rem .5rem;
    }
  }

  .btn-micro {
    font-size: 70% !important;
  }

  .-image-wrapper {
    height: 8rem;
    width: 100%;
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    border: .9px solid #EBEBEB;
    box-shadow: 0px 5px 50px -20px #595959;

    .-image {
      width: 100%;
      height: 100%;
      background-color: black;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition: all .5s;
      -webkit-transition: all .5s;
      -moz-transition: all .5s;
      -o-transition: all .5s;
    }

    .-image::before {
      content: "";
      display: none;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(52, 73, 94, 0.75);
    }
  }

  .-image-wrapper:hover .-image,
  .-image-wrapper:focus .-image {
    transform: scale(1.2);
  }
</style>
