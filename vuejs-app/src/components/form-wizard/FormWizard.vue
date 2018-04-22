<template>
  <div class="form-wizard">
    <div class="row no-gutters justify-content-center">
      <div id="ms_flow_wrapper" class="col-12">
        <div id="ms_steps_header" class="row justify-content-center">

          <div class="col-11">
            <div class="row justify-content-between">
              <div class="ms-step col" v-for="(step, index) in steps" :key="index" :ref="'step-' + (index + 1)">
                <span class="ms-step-title text-truncate" :class="{ active: index === 0 }">{{ step.name }}</span>
                <div class="ms-step-icon"></div>
              </div>
            </div>
          </div>
        </div>

        <hr class="col-11">

        <div class="ms_flow_body row justify-content-center">
          <div class="ms-flow-body col-11">
            <slot :name="currentStep" v-if="!wizardCompleted">
              <div>Default Form</div>
            </slot>

            <slot name="wizardCompleted" v-if="wizardCompleted">
              <div class="row justify-content-center">
                <div class="col-12 text-center">
                  <i class="fa fa-check-circle text-primary" style="font-size: 5em"></i>
                </div>
              </div>
            </slot>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-wizard',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    currentStep: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      wizardCompleted: false
    }
  },
  watch: {
    currentStep () {
      this.setPreviousStepAsDone()

      if (this.currentStep > this.steps.length) {
        this.wizardCompleted = true
      } else {
        this.setCurrentStepAsActive()
      }
    }
  },
  methods: {
    setPreviousStepAsDone () {
      const previousStepRef = this.$refs['step-' + (this.currentStep - 1)][0]
      const stepIconRef = previousStepRef.getElementsByClassName('ms-step-icon')[0]
      stepIconRef.classList.add('done')
    },
    setCurrentStepAsActive () {
      const currentStepRef = this.$refs['step-' + this.currentStep][0]
      const stepTitleRef = currentStepRef.getElementsByClassName('ms-step-title')[0]
      stepTitleRef.classList.add('active')
    }
  }
}
</script>

<style lang="scss" scoped>
  #ms_steps_header {
  }

  .ms-step {
    overflow: hidden;
    text-overflow: ellipsis;
    color: #E8E8E8 !important;
    text-align: center;
  }
  .ms-step-title {
    font-size: 1em;
    color: #E8E8E8;
  }

  .ms-step-title.active {
    font-weight: bold;
    color: #FFC10C;
  }

  .ms-step-icon {
    width: 15px;
    height: 15px;
    border-radius: 20px;
    background-color: #E8E8E8;
    margin: 0 auto;
  }

  .ms-step-icon.done {
    background-color: #FFC10C;
  }

  .ms-flow-body {
    display: block;
  }

  .ms-flow-actions {
    position: absolute;
    bottom: 20px;
    width: 50%;
  }

  .fa {
    font-size: 2em;
  }
</style>
