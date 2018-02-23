<template>
    <div class="home">
      <!--<img src="../../assets/images/home_search_bg.png" style="width:100%;" alt="" data-reactid="131">-->

      <search-box></search-box>

      <vuestic-widget>
        <div class="row justify-content-center">
          <div class="col-6">

          </div>
        </div>
      </vuestic-widget>

    </div>
</template>

<script>
    import VuesticWidget from "../vuestic-components/vuestic-widget/VuesticWidget";
    import SearchBox from "../search/SearchBox";

    export default {
      name: "home",
      components: {
        SearchBox,
        VuesticWidget
      }
    }
</script>

<style scoped>

</style>
