<template>
    <div class="search-box col-12">
      <vuestic-widget :class="'-search-box-widget'">
        <form>
          <div class="row no-gutters justify-content-center mt-5">
            <div class="col-3">
              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    name="search"
                    :placeholder="searchSelect.placeholder"
                    required/>
                  <i class="fa fa-search icon-left input-icon"></i>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
            <div>
              <multiselect
                :searchable="false"
                :show-labels="false"
                :options="searchSelect.options"
                v-model="searchSelect.selectedOption"
                required>
              </multiselect>
            </div>
          </div>
        </form>
      </vuestic-widget>
    </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  export default {
    name: "search-box",
    components: {
      Multiselect
    },
    data () {
      return {
        searchSelect: {
          placeholder: 'Search for photos',
          options: ["Photos", "Illustrations", "Footage", "Audio"],
          selectedOption: "Photos",
        }
      }
    },
    watch: {
      'searchSelect.selectedOption' () {
        this.searchSelect.placeholder = `Search for ${this.searchSelect.selectedOption.toLowerCase()}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-box {
    height: 200px;

    .-search-box-widget {
      height: 100%;
    }
  }
</style>
