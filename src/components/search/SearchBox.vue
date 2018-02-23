<template>
    <div class="search-box">
      <vuestic-widget>
        <div class="row no-gutters justify-content-center">
          <div class="col-4">
            <b-field>
              <b-input :placeholder="searchSelect.placeholder"
                       type="search"
                       icon-pack="fa"
                       icon="search">
              </b-input>
            </b-field>
          </div>
          <div class="">
            <b-field>
              <b-select v-model="searchSelect.selectedOption">
                <option
                  v-for="option in searchSelect.options"
                  :value="option"
                  :key="option">
                  {{ option }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
      </vuestic-widget>
    </div>
</template>

<script>
    export default {
        name: "search-box",
      data () {
          return {
            searchSelect: {
              placeholder: 'Search for photos',
              options: ["photos", "illustrations", "footage", "audio"],
              selectedOption: "photos",
            }
          }
      },
      watch: {
          'searchSelect.selectedOption' () {
            this.searchSelect.placeholder = `Search for ${this.searchSelect.selectedOption}`
          }
      }
    }
</script>

<style scoped>

</style>
