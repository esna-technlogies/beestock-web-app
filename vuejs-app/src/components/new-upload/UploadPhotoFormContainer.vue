<template>
   <div class="upload-photo-form-container mt-5">

     <div class="row justify-content-center">

       <div class="col-8" style="border: 3px solid #40A9DF;padding: 30px 50px; background-color: white; position: relative">
         <form-error-alert v-show="isErrorAlert" :alert-message="errorAlertMessage"/>

         <a aria-hidden="true" class="entypo entypo-cancel text-info -close-container-icon" @click="emitCloseContainer(containerId)"></a>

         <div class="row justify-content-center">
           <div class="col-6">

             <droply :id="'s3-upload-dropzone-' + containerId"
                     ref="s3UploadDropzone"
                     :class="'border-0 mt-3'"
                     :url="s3UploadDropzoneOptions.url"
                     :thumbnailHeight="s3UploadDropzoneOptions.thumbnailHeight"
                     :thumbnailWidth="s3UploadDropzoneOptions.thumbnailWidth"
                     :maxNumberOfFiles="s3UploadDropzoneOptions.maxNumberOfFiles"
                     :maxFileSizeInMB="s3UploadDropzoneOptions.maxFileSizeInMB"
                     :acceptedFileTypes="s3UploadDropzoneOptions.acceptedFileTypes"
                     :upload-message-text="s3UploadDropzoneOptions.uploadMessageText"
                     @droply-success="onUploadSuccess">
             </droply>
             <small v-show="errors.has('originalFile')" class="help text-danger">{{ errors.first('originalFile') }}</small>

             <input
               type="hidden"
               name="originalFile"
               v-model="originalFile"
               v-validate.initial="'required'"
               data-vv-as="Photo Original File"
               required>
           </div>

           <div class="col-12 text-center">
             <span class="small text-muted">
               Only <strong>jpg</strong>, <strong>jpeg</strong> and <strong>png</strong> photos of <strong>4.0 MB</strong> maximum size.
             </span>
           </div>
         </div>

         <div class="mt-4 mb-4" style="border: 1px solid #E2E2E2"></div>

         <div class="col-12 text-center m-0 p-0">
           <span class="h5"><strong>{{ 'forms.heads.photoDetails' | translate }}</strong></span>
         </div>

         <form name="upload-photo-form" @submit.prevent="doUploadPhoto">
           <div class="row justify-content-center">
             <div class="col-6 justify-content-center pl-0">
               <div class="col-12">
                 <fieldset>
                   <input-tag
                     class="mt-4"
                     placeholder="Add Keyword"
                     :tags.sync="keywords" />
                   <!--<div class="form-group mb-1" :class="{ 'has-error': errors.has('firstName') }">
                     <div class="input-group">
                       <input
                         type="text"
                         id="-keywords"
                         name="firstName"
                         v-model="firstName"
                         v-validate.initial="'required|alpha_spaces|min:3'"
                         data-vv-as="First Name"
                         :placeholder="'forms.labels.keywords' | translate"
                         required>
                       <i class="bar"></i>
                       <small v-show="errors.has('firstName')" class="help text-danger">{{ errors.first('firstName') }}</small>
                     </div>
                   </div>-->
                 </fieldset>
               </div>

               <div class="col-12">
                 <fieldset>
                   <div class="form-group mb-1">
                     <div class="input-group">
                       <multiselect
                         name="usage"
                         :options="usageList"
                         :searchable="false"
                         :show-labels="false"
                         :allow-empty="false"
                         v-model="usage"
                         placeholder="Select Usage"
                         required>
                       </multiselect>
                     </div>
                   </div>
                 </fieldset>
               </div>

               <div class="col-12">
                 <fieldset>
                   <div class="form-group mb-1" :class="{ 'has-error': errors.has('firstName') }">
                     <div class="input-group">
                       <input
                         type="hidden"
                         name="category"
                         v-model="category"
                         v-validate.initial="'required'"
                         data-vv-as="Category"
                         required>
                       <multiselect
                         label="title"
                         name="title"
                         track-by="title"
                         :class="'rounded-0'"
                         :options="categoryList"
                         v-model="category"
                         placeholder="Select Category"
                         required>
                       </multiselect>
                       <small v-show="errors.has('category')" class="help text-danger">{{ errors.first('category') }}</small>
                     </div>
                   </div>
                 </fieldset>
               </div>
             </div>

             <div class="col-6 justify-content-center pr-0">
               <div class="col-12">
                 <fieldset>
                   <div class="form-group mb-1" :class="{ 'has-error': errors.has('firstName') }">
                     <div class="input-group">
                       <input
                         type="text"
                         id="-title"
                         name="title"
                         v-model="title"
                         v-validate.initial="'required|alpha_spaces|min:3'"
                         data-vv-as="Title"
                         :placeholder="'forms.labels.title' | translate"
                         required>
                       <i class="bar"></i>
                       <small v-show="errors.has('firstName')" class="help text-danger">{{ errors.first('firstName') }}</small>
                     </div>
                   </div>
                 </fieldset>
               </div>
               <div class="col-12">
                 <fieldset>
                   <div class="form-group mb-1" :class="{ 'has-error': errors.has('firstName') }">
                     <div class="input-group">
                       <textarea
                         type="text"
                         id="-description"
                         name="description"
                         v-model="description"
                         v-validate.initial="'required|min:3'"
                         data-vv-as="Description"
                         :placeholder="'forms.labels.description' | translate"
                         required
                       >
                       </textarea>
                       <i class="bar"></i>
                       <small v-show="errors.has('description')" class="help text-danger">{{ errors.first('description') }}</small>
                     </div>
                   </div>
                 </fieldset>
               </div>
               <div class="col-12">
                 <fieldset>
                   <div class="form-group mb-1" :class="{ 'has-error': errors.has('firstName') }">
                     <div class="input-group">
                       <input
                         type="text"
                         id="-suggested-price"
                         name="suggestedPrice"
                         v-model="suggestedPrice"
                         v-validate.initial="'numeric|min:3'"
                         data-vv-as="Suggested Price"
                         :placeholder="'forms.labels.suggestedPrice' | translate"
                       >
                       <i class="bar"></i>
                       <small v-show="errors.has('suggestedPrice')" class="help text-danger">{{ errors.first('suggestedPrice') }}</small>
                     </div>
                   </div>
                 </fieldset>
               </div>
             </div>

             <div class="col mt-3 mb-2">
               <button class="btn btn-info btn-micro btn-block rounded-0" :disabled="isLoading">
                 {{ 'forms.buttons.save' | translate }}
               </button>
             </div>

           </div>
         </form>

         <basic-loader v-show="isLoading"/>
       </div>
     </div>
   </div>
</template>

<script>
  import InputTag from 'vue-input-tag'
  import Multiselect from 'vue-multiselect'
  import Droply from 'droply'
  import BasicLoader from '../loaders/BasicLoader'
  import FormErrorAlert from '../alerts/FormErrorAlert'

  import categoryService from '../../services/category'
  import photoService from '../../services/photo'
  import fileStorageService from '../../services/file-storage'
  import {handleServiceError} from '../../helpers/error-handlers'


  export default {
    name: 'upload-photo-form-container',
    props: {
      containerId: {
        type: Number,
        default: 0
      }
    },
    components: {
      Droply,
      InputTag,
      BasicLoader,
      Multiselect,
      FormErrorAlert
    },
    data () {
      return {
        isLoading: false,
        isErrorAlert: false,
        errorAlertMessage: '',
        categoryList: [],
        usageList: ['Commercial Use'],
        originalFile: '',
        keywords: [],
        usage: 'Commercial Use',
        category: '',
        title: '',
        description: '',
        suggestedPrice: '',
        fileUploadPolicy: {},
        s3UploadDropzoneOptions: {
          thumbnailHeight: 150,
          thumbnailWidth: 250,
          maxNumberOfFiles: 1,
          acceptedFileTypes: 'image/jpeg,image/png',
          maxFileSizeInMB: 4,
          url: 'https://beesstock-users-uploads.s3-us-west-2.amazonaws.com/',
          uploadMessageText: 'Drop file(s) to upload <br><strong>or click to select</strong>'
        }
      }
    },
    computed: {
      userUUID () {
        return this.$store.getters.currentUserUUID()
      }
    },
    methods: {
      async prepareComponentData () {
        this.showBasicLoader()

        try {
          await this.setCategoryList()
          await this.setFileUploadPolicy()
          await this.setS3UploadDropzoneWithUploadPolicy()
        } catch (error) {
          handleServiceError(error, this.$route)
        }

        this.hideBasicLoader()
      },
      async doUploadPhoto () {
        if (!await this.$validator.validateAll()) return

        this.showBasicLoader()
        this.clearErrorAlert()

        const queryParams = {
          title: this.title,
          description: this.description,
          user: this.userUUID,
          category: this.category.uuid,
          keywords: this.keywords.join(','),
          originalFile: this.originalFile,
          suggestedPrice: this.suggestedPrice ? this.suggestedPrice : 0
        }

        try {
          const uploadedPhoto = await photoService.create(queryParams)
            .then(response => response.data.photo)

          this.emitUploadPhotoSuccess(uploadedPhoto)
          this.emitCloseContainer(this.containerId)
        } catch (error) {
          this.handleFailedPhotoUpload(error)
        }

        this.hideBasicLoader()
      },
      async setCategoryList () {
        this.categoryList = await categoryService.findAll()
          .then(response => Object.values(response.data.categories))
      },
      async setFileUploadPolicy () {
        this.fileUploadPolicy = await fileStorageService.getNewFileUploadPolicy(this.userUUID)
          .then(response => response.data.fileUploadPolicy)
      },
      async setS3UploadDropzoneWithUploadPolicy () {
        this.$refs.s3UploadDropzone.dropzone.options.params = this.fileUploadPolicy.formInputs
      },
      async setSuggestedKeywords () {
        const queryParams = {
          originalFile: this.originalFile
        }

        await photoService.getSuggestedKeywords(queryParams)
          .then(response => response.data.keywords)
          .then(keywords => { this.keywords.push(...keywords) })
      },
      handleFailedPhotoUpload (error) {
        if (!error.response) {
          this.setErrorAlert("Unknown error, please call the website's administrator")
        } else {
          const errorDetails = error.response.data.error.details

          for (const field of Object.keys(errorDetails)) {
            const errorMessage = errorDetails[field].message.split(' - ')

            const message = errorMessage.length === 1 ? errorMessage[0] : errorMessage[1]

            this.errors.add(field, message)
          }

          this.setErrorAlert(error.response.data.error.message)
        }
      },
      onUploadSuccess (s3ObjectLocation) {
        this.originalFile = s3ObjectLocation.xhr.getResponseHeader('Location')
        this.setSuggestedKeywords()
      },
      emitCloseContainer (containerId) {
        this.$emit('closeContainer', containerId)
      },
      emitUploadPhotoSuccess (uploadedPhoto) {
        this.$emit('uploadPhotoSuccess', uploadedPhoto)
      },
      showBasicLoader () {
        this.isLoading = true
      },
      hideBasicLoader () {
        this.isLoading = false
      },
      clearErrorAlert () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true
        this.errorAlertMessage = message
      }
    },
    created () {
      this.prepareComponentData()
    }
  }
</script>

<style lang="scss" scoped>
  .-close-container-icon {
    position: absolute;
    top: -2px;
    right: 10px;
    font-size: 2em;
  }

  .-beestock-loading-wrapper {
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    .-beestock-loading {
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      max-width: 256px;
      max-height: 256px;
    }
  }

  .-alert {
    position: absolute;
    width :100%;
    top: 0;
    left: 0;
    z-index: auto;
  }
</style>
