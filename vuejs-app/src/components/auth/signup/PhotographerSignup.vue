<template>
  <div class="photographer-signup">
    <div class="row no-gutters justify-content-center">
      <div class="col-7">
        <form-error-alert v-show="isErrorAlert" :alert-message="errorAlertMessage"/>

        <vuestic-widget class="no-h-padding -photographer-signup-widget">
          <form-wizard
            :steps="flowSteps"
            :currentStep="currentStep">

            <signup-step
              slot="1"
              @clearErrorAlert="clearErrorAlert"
              @setErrorAlert="setErrorAlert"
              @signupStepDone="signupStepDone"
            />

            <verify-user-step
              slot="2"
              @clearErrorAlert="clearErrorAlert"
              @setErrorAlert="setErrorAlert"
              @verifyUserStepDone="verifyUserStepDone"
              :registeredUser="registeredUser"
            />

            <user-identification-step
              slot="3"
              @clearErrorAlert="clearErrorAlert"
              @setErrorAlert="setErrorAlert"
              @uploadUserIdStepDone="uploadUserIdStepDone"
            />

            <wizard-completed
              slot="wizardCompleted"
              :message="'forms.photographerSignupWizard.wizardCompleted' | translate"
            />

          </form-wizard>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import FormErrorAlert from '../../alerts/FormErrorAlert'
  import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'
  import FormWizard from '../../form-wizard/FormWizard'
  import SignupStep from './SignupStep'
  import VerifyUserStep from './VerifyUserStep'
  import WizardCompleted from './WizardCompleted'
  import UserIdentificationStep from './UploadUserIdStep'

  export default {
    name: 'photographer-signup',
    components: {
      UserIdentificationStep,
      WizardCompleted,
      VerifyUserStep,
      SignupStep,
      FormWizard,
      VuesticWidget,
      FormErrorAlert
    },
    data () {
      return {
        isLoading: false,
        isErrorAlert: false,
        errorAlertMessage: '',
        registeredUser: {},
        currentStep: 1,
        flowSteps: [
          {
            name: this.$t('forms.photographerSignupWizard.stepOne')
          },
          {
            name: this.$t('forms.photographerSignupWizard.stepTwo')
          },
          {
            name: this.$t('forms.photographerSignupWizard.stepThree')
          }
        ]
      }
    },
    methods: {
      clearErrorAlert () {
        this.isErrorAlert = false
        this.errorAlertMessage = ''
      },
      setErrorAlert (message = 'Default Error Message') {
        this.isErrorAlert = true
        this.errorAlertMessage = message
      },
      signupStepDone (registeredUser) {
        this.registeredUser = registeredUser
        this.moveToNextStep()
      },
      verifyUserStepDone () {
        this.moveToNextStep()
      },
      uploadUserIdStepDone () {
        this.moveToNextStep()
      },
      moveToNextStep () {
        this.currentStep++
      }
    }
  }
</script>

<style lang="scss" scoped>
  .-photographer-signup-widget {
    margin: 100px auto !important;
    position: relative;
  }

  .-alert {
    position: absolute;
    width :100%;
    top: 30px;
    left: 0;
  }
</style>
