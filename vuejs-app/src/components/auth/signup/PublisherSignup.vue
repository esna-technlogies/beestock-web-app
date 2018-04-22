<template>
    <div class="publisher-signup">
      <div class="row no-gutters justify-content-center">
        <div class="col-7">
          <form-error-alert v-show="isErrorAlert" :alert-message="errorAlertMessage"/>

          <vuestic-widget class="no-h-padding -publisher-signup-widget">
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

              <wizard-completed
                :message="'forms.publisherSignupWizard.wizardCompleted' | translate"
                slot="wizardCompleted"
              />

              <!--<div slot="wizardCompleted">
                <div class="row justify-content-center">
                  <div class="col-12 text-center">
                    <span>
                      <i class="fa fa-check-square text-primary" style="font-size: 1em"></i>
                      {{ 'forms.publisherSignupWizard.wizardCompleted' | translate }}
                    </span>
                  </div>

                  <div class="col-12 text-center">
                    <router-link :to="{ name: 'Login' }">{{ 'forms.misc.signInHere' | translate }}</router-link>
                  </div>
                </div>
              </div>-->
            </form-wizard>
          </vuestic-widget>
        </div>
      </div>
    </div>
</template>

<script>
  import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'

  import FormErrorAlert from '../../alerts/FormErrorAlert'
  import FormWizard from '../../form-wizard/FormWizard'
  import SignupStep from './SignupStep'
  import VerifyUserStep from './VerifyUserStep'
  import WizardCompleted from './WizardCompleted'

  export default {
    name: 'publisher-signup',
    metaInfo () {
      return {
        title: this.$t('titles.publisherSignup')
      }
    },
    components: {
      FormWizard,
      SignupStep,
      VuesticWidget,
      FormErrorAlert,
      VerifyUserStep,
      WizardCompleted
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
            name: this.$t('forms.publisherSignupWizard.stepOne')
          },
          {
            name: this.$t('forms.publisherSignupWizard.stepTwo')
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
      moveToNextStep () {
        this.currentStep++
      }
    }
  }
</script>

<style lang="scss" scoped>
  .-publisher-signup-widget {
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
