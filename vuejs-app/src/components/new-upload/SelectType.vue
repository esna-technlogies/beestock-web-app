<template>
  <div class="select-type mt-5">
    <div class="row justify-content-center">
      <div class="col-8" style="border: 3px solid #40A9DF;padding: 30px; background-color: white">
        <div class="row justify-content-center">
          <div class="col-12 text-center mb-3">
            <h4>select type</h4>
          </div>

          <div class="col-4" @click="addUploadVectorContainer">
            <button class="btn btn-info btn-sm btn-block rounded-0 pt-5 pb-5">vector</button>
          </div>

          <div class="col-4" @click="addUploadFootageContainer">
            <button class="btn btn-info btn-sm btn-block rounded-0 pt-5 pb-5">footage</button>
          </div>

          <div class="col-4" @click="addUploadPhotoContainer">
            <button class="btn btn-info btn-sm btn-block rounded-0 pt-5 pb-5">photo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'select-type',
    methods: {
      addUploadVectorContainer () {
        this.$emit('uploadVectorContainer')
      },
      addUploadFootageContainer () {
        this.$emit('uploadFootageContainer')
      },
      addUploadPhotoContainer () {
        this.$emit('uploadPhotoContainer')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
