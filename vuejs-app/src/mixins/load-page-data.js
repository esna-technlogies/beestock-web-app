export const loadPageDataMixin = {
  methods: {
    async loadPageData () {
      this.startPaginationLoading()
      await this.preparePageData()
      this.stopPaginationLoading()
    },
    startPaginationLoading () {
      this.isPaginationDataLoading = true
    },
    stopPaginationLoading () {
      this.isPaginationDataLoading = false
    }
  }
}
