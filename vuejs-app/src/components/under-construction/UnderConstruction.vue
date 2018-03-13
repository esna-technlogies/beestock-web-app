<template>
    <div class="under-construction">
      <vuestic-widget :class="'-under-construction-widget -transparent-widget'">
        <div class="row">
          <div class="col-12">
            <h4>{{ pageTitle }}</h4>
          </div>

          <div class="col-12 mt-3">
            <img src="../../assets/images/under-construction.gif" alt="Under Construction">
          </div>
        </div>
      </vuestic-widget>
    </div>
</template>

<script>
  export default {
    name: 'under-construction',
    props: {
      pageTitle: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .-transparent-widget {
    background: rgba(255, 255, 255, 0.95)
  }

  .-under-construction-widget {
    text-align: center;
  }

  .-under-construction-widget img {
    opacity: 0.7;
  }
</style>
