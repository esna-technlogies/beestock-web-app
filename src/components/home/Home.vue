<template>
    <div class="home">
      <vuestic-pre-loader v-show="isLoading" ref="preLoader" class="pre-loader"></vuestic-pre-loader>

      <app-alert :alertType="alertType" :alertMessage="alertMessage"></app-alert>

      <div v-show="!isLoading">
        <div class="row justify-content-center">
          <search-box></search-box>
        </div>

        <div class="row justify-content-center" style="color: white">
          <div class="col-10 text-center">
            <h6><strong>Less searching. More finding</strong></h6>
            <h6><strong>Discover royalty-free images, illustrations and videos</strong></h6>
            <h6><strong>that will make you stand out.</strong></h6>

            <div class="row mt-5 justify-content-start">
              <div class="col-3" v-for="(photo, photoIndex) in randomPhotoList">
                <div class="-image-wrapper">
                  <div class="-image"
                       :key="photoIndex"
                       :style="{ backgroundImage: 'url(' + photo.file_storage.sizes.size_500 + ')' }">
                  </div>

                  <div class="-category-name-wrapper text-center">
                    <router-link class="-category-name btn btn-warning"
                                 :to="{ name: 'CategoryDetails', params: { uuid: photo.category }}">
                      {{ photo.category_title }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 mt-5 text-center">
            <h5><strong>Browse All Categories</strong></h5>

            <div class="row mt-4 justify-content-center">
              <div class="col-3 text-left" v-for="category in categoryList">
                <router-link :to="{ name: 'CategoryDetails', params: { uuid: category.uuid } }">{{ category.title }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import VuesticWidget from "../vuestic-components/vuestic-widget/VuesticWidget";
    import SearchBox from "../search/SearchBox";
    import AppAlert from '../app-alert/AppAlert';

    import categoryService from '../../services/category'


    export default {
      name: "home",
      metaInfo: {
        title: 'Home'
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
        AppAlert,
        SearchBox,
        VuesticWidget
      },
      data() {
        return {
          isLoading: false,
          categoryList: [],
          randomPhotoList: []
        }
      },
      methods: {
        async fetchAndRenderFourRandomPhotos() {
          this.startLoading();

          await this.setCategoryList();

          for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * (this.categoryList.length - 0) - 0);
            const randomCategory = this.categoryList[randomIndex];

            await categoryService.findRandomPhotoByUUID(randomCategory.uuid)
              .then(response => {
                response.data.photo.category_title = randomCategory.title;
                this.randomPhotoList.push(response.data.photo);
              })
              .catch(error => {
                console.log(error);
              });
          }

          this.stopLoading();
        },
        async fetchAndRenderAllCategories() {
          this.categoryList = await categoryService.findAll();
        },
        async setCategoryList () {
          await categoryService.findAll()
            .then(response => {
              const categories = response.data.categories;

              for (const category of Object.values(categories)) {
                this.categoryList.push(category);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        startLoading () {
          this.isLoading = true;
        },
        stopLoading () {
          this.isLoading = false;
        }
      },
      created () {
        this.fetchAndRenderFourRandomPhotos();
      }
    }
</script>

<style lang="scss" scoped>
  .-category-name-wrapper {
    bottom: 0px;
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
    box-shadow: 0px 5px 50px -20px #595959;
    cursor: pointer;
    overflow: hidden;

    .-image {
      width: 100%;
      height: 100%;
      background-color: black;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border: .9px solid #EBEBEB;
      border-bottom: 0;
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
