<template>
  <div class="signup">
    <div class="row justify-content-center -signup-wrapper">
      <div class="col-6 text-right -publisher-signup-wrapper">
        <div class="col-12">PUB-</div>
        <div class="col-12">LISHER</div>
        <div class="col-12">
          <router-link :to="{ name: 'RegisterPublisher' }" tag="button" class="-signup-button btn btn-primary btn-micro rounded-0">
            {{ 'forms.buttons.signup' | translate }}
          </router-link>
        </div>
      </div>

      <div class="col-6 text-left -photographer-signup-wrapper">
        <div class="col-12">PHOTO-</div>
        <div class="col-12">GRAPHER</div>
        <div class="col-12">
          <router-link :to="{ name: 'RegisterPhotographer' }" tag="button" class="-signup-button btn btn-primary btn-micro rounded-0">
            {{ 'forms.buttons.signup' | translate }}
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'signup',
    metaInfo () {
      return {
        title: this.$t('titles.signup')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';

  .-signup-widget {
    position: relative;
    margin: 100px auto !important;
  }

  .-alert {
    position: absolute;
    width :100%;
    top: 30px;
    left: 0;
  }

  .-signup-wrapper {
    height: 600px;
  }

  .-publisher-signup-wrapper {
    background-color: #FFC10C;
    color: #25539F;
    font-weight: bold;
    height: 100%;
    padding-top: 100px;
    padding-right: 40px;

    .-signup-button {
      border-color: #25539F !important;
    }

    div:nth-child(1), div:nth-child(2) {
      font-size: 80px;
    }
  }

  .-photographer-signup-wrapper {
    background-color: #25539F;
    color: #FFC10C;
    font-weight: bold;
    height: 100%;
    padding-top: 100px;
    padding-left: 40px;

    .-signup-button {
      border-color: #FFC10C !important;
    }

    div:nth-child(1), div:nth-child(2) {
      font-size: 80px;
    }
  }

  .signup button.-signup-button {
    border: 5px solid;
    background-color: white;
    color: #E74155 ;
    box-shadow: none;
  }
</style>
