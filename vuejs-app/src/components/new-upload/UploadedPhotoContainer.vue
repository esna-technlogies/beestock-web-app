<template>
  <div class="uploaded-photo-container mt-5">
    <div class="row justify-content-center">

      <div class="col-8" style="border: 3px solid #40A9DF;padding: 30px 50px; background-color: white; position: relative">
        <div class="row justify-content-center">
          <div class="col-4 pl-3 pr-3">
            <div class="-image-wrapper">
              <div class="-image"
                   :key="1"
                   :style="{ backgroundImage: 'url(' + photo.file_storage.sizes.size_250 + ')' }">
              </div>
            </div>
          </div>

          <div class="col-8">
            <router-link
              target="_blank"
              :to="{ name: 'Photo', params: { uuid: photo.uuid } }"
              :style="{ color: '#33495C' }"
            >
              <h5>{{ photo.title }}</h5>
            </router-link>
            <p>{{ photo.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'uploaded-photo-container',
    props: {
      photo: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .-image-wrapper {
    height: 12rem;
    width: 100%;
    padding: 0;
    overflow: hidden;
    border: .9px solid #EBEBEB;
    box-shadow: 0px 5px 50px -20px #595959;
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;
    border: 7px solid #19A08F;

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
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      border: 2px solid white;
      height: 100%;
      transition: all .5s;
      -webkit-transition: all .5s;
      -moz-transition: all .5s;
      -o-transition: all .5s;
    }

    :hover .-image, :focus .-image {
      transform: scale(1.2);
    }
  }
</style>
