<template>
    <div class="new-upload">
      <vuestic-widget :class="'-new-upload-widget -transparent-widget'">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <router-link
              :to="{ name: 'UserUploads' }"
              class="col-4 btn btn-light border border-info btn-micro rounded-0 text-muted mr-3"
            >
              Preview Downloads
            </router-link>

            <button class="col-2 btn btn btn-light border border-info btn-micro btn-with-icon rounded-icon" @click="showSelectType">
              <span aria-hidden="true" class="entypo entypo-plus text-muted pl-1" style="font-size: 2.1em"></span>
            </button>
          </div>
        </div>

        <select-type
          v-if="noOpenedContainers"
          @uploadVectorContainer="addUploadVectorContainer"
          @uploadFootageContainer="addUploadFootageContainer"
          @uploadPhotoContainer="addUploadPhotoContainer" />

        <template v-for="container in uploadPhotoFormContainerList">
          <component
            :is="container.component"
            :key="container.component.name"
            :containerId="container.id"
            @closeContainer="closeContainerEventHandler($event)"
            @uploadPhotoSuccess="uploadPhotoSuccessEventHandler"
            v-if="!closedContainerList.includes(container.id)" />
        </template>

        <template v-for="(container, index) in uploadedPhotoContainerList">
          <component
            :is="container"
            :key="container.name"
            :index="index"
            :photo="uploadedPhotoList[index]"/>
        </template>
      </vuestic-widget>
    </div>
</template>

<script>
  import UnderConstruction from '../under-construction/UnderConstruction'
  import UploadPhotoFormContainer from './UploadPhotoFormContainer'
  import UploadedPhotoContainer from './UploadedPhotoContainer'
  import SelectType from './SelectType'


  export default {
    name: 'new-upload',
    metaInfo () {
      return {
        title: this.pageTitle
      }
    },
    components: {
      SelectType,
      UnderConstruction,
      UploadPhotoFormContainer,
      UploadedPhotoContainer
    },
    data () {
      return {
        pageTitle: this.$t('titles.newUpload'),
        isSelectType: true,
        uploadPhotoFormContainerList: [],
        uploadedPhotoContainerList: [],
        uploadedPhotoList: [],
        closedContainerList: []
      }
    },
    computed: {
      noOpenedContainers () {
        return this.uploadPhotoFormContainerList.length === this.closedContainerList.length || this.isSelectType
      }
    },
    methods: {
      showSelectType () {
        this.isSelectType = true
      },
      addUploadVectorContainer () {
        this.isSelectType = false
      },
      addUploadFootageContainer () {
        this.isSelectType = false
      },
      addUploadPhotoContainer () {
        this.isSelectType = false

        this.uploadPhotoFormContainerList.push({
          id: new Date().getTime(),
          component: UploadPhotoFormContainer
        })
      },
      closeContainerEventHandler (containerId) {
        this.closedContainerList.push(containerId)
      },
      uploadPhotoSuccessEventHandler (photo) {
        this.uploadedPhotoList.push(photo)
        this.uploadedPhotoContainerList.push(UploadedPhotoContainer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .-transparent-widget {
    background: rgba(255, 255, 255, 0.95)
  }
</style>
