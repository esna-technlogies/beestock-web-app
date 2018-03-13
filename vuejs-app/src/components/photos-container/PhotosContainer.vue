<template>
  <div class="photos-container row justify-content-start">
    <div class="col-3 mt-3 mb-3" v-for="(photo, photoIndex) in photoList">
      <div class="-image-wrapper">

        <router-link :to="{ name: 'Photo', params: { uuid: photo.uuid } }" :key="photoIndex">
          <!--<img :src="photo.file_storage.sizes.size_250" :alt="photo.title">-->
          <div class="-image"
               :key="photoIndex"
               :style="{ backgroundImage: 'url(' + photo.file_storage.sizes.size_250 + ')' }">
          </div>
        </router-link>

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
</template>

<script>
  export default {
    name: 'photos-container',
    props: {
      photoList: {
        type: Array,
        default: () => []
      }
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
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;

    a {
      width: 100%;
      cursor: pointer;
      text-decoration: none;
    }

    img {
      vertical-align: middle;
      float: left;
      width: 100%;
      overflow: hidden;
      min-height: 100px;
      width: 100%;
      transition: all .5s;
      -webkit-transition: all .5s;
      -moz-transition: all .5s;
      -o-transition: all .5s;
    }

    :hover img, :focus img {
      transform: scale(1.1);
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

    :hover .-image, :focus .-image {
      transform: scale(1.2);
    }
  }

  .-photo-details {
    bottom: 0;
    left: 0px;
    width: 100%;
    height: 20%;
    padding: 0 .5rem;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    color: white;

    * {
      color: white;
      font-size: .75em;
    }

    .-photo-title {
      font-size: .75em;
      position: absolute;
      top: 0.05rem;
    }

    .-photo-creation-moment {
      font-size: .65em;
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
</style>
