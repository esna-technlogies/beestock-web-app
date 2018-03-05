<template>
    <div class="home">
      <app-alert :alertType="alertType" :alertMessage="alertMessage"></app-alert>
      <!--<img src="../../assets/images/home_search_bg.png" style="width:100%;" alt="" data-reactid="131">-->

      <search-box></search-box>

      <vuestic-widget>
        <div class="row justify-content-center">
          <div class="col-6 text-center">
            <h5><strong>Browse All Categories</strong></h5>

            <ul>
              <!--<li v-for="category in categoryList">-->
                <!--{{ category }}-->
              <!--</li>-->
            </ul>
          </div>
        </div>
      </vuestic-widget>

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
          categoryList: []
        }
      },
      methods: {
        async fetchAndRenderFourRandomPhotos() {
          await categoryService.findByUUID()
        },
        async fetchAndRenderAllCategories() {
          this.categoryList = await categoryService.findAll();
        }
      },
      created() {
        // this.fetchAndRenderAllCategories();
        // console.log(this.categoryList);
        // this.fetchAndRenderFourRandomPhotos();
      }
    }
</script>

<style scoped>

</style>
