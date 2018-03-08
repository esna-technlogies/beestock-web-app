<template>
    <div class="category">
      <vuestic-breadcrumbs :breadcrumbs="breadcrumbs"/>

      <div class="row justify-content-start">
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
      </div>
    </div>
</template>

<script>
  import photoService from '../../services/photo'
  import categoryService from '../../services/category'

  export default {
    name: "category",
    metaInfo: {
      title: this.category ? `${this.category.title} Category` : 'Category'
    },
    props: {
      uuid: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        category: '',
        photoList: []
      }
    },
    computed: {
      breadcrumbs () {
        this.$route.meta.title = this.category.title;

        return [
          this.$route.matched.find(route => route.parent === undefined),
          this.$route
        ];
      }
    },
    methods: {
      async fetchCategoryDetails () {
        try {
          this.category = await categoryService.findByUUID(this.uuid)
            .then(response => response.data.category);

        } catch (error) {
          console.log(error.response ? error.response : error);
        }
      },
      async fetchCategoryPhotos () {
        this.startLoading();

        try {
          this.photoList = await photoService.findByCategoryUUID(this.uuid)
            .then(response => Object.values(response.data.photos));

        } catch (error) {
          console.log(error.response ? error.response : error);
        }

        this.stopLoading();
      },
      startLoading () {
        this.$store.commit('setLoading', true);
      },
      stopLoading () {
        this.$store.commit('setLoading', false);
      }
    },
    created () {
      this.fetchCategoryDetails();
      this.fetchCategoryPhotos();
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

  .btn-micro {
    font-size: 70% !important;
  }

  .top-right {
    position: absolute;
    top: 8px;
    right: 22px;
  }

  .bottom-right {
    position: absolute;
    bottom: 23px;
    right: 22px;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
</style>
