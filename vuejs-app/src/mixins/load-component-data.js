export const loadComponentDataMixin = {
  methods: {
    async loadComponentData () {
      this.startPageLoading()
      await this.prepareComponentData()
      this.stopPageLoading()
    },
    startPageLoading () {
      this.isPageDataLoading = true
    },
    stopPageLoading () {
      this.isPageDataLoading = false
    }
  }
}
